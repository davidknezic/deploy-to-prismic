const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const next = require('next')
const remote = require('./contento-remote')

const parseSource = require('./api/parse-source')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const extractToken = header => (header || '').toString().slice('Bearer '.length)
  const server = express()

  server.use(bodyParser.urlencoded({
    extended: true
  }))
  server.use(bodyParser.json())
  server.use(cookieParser('change it'))

  server.post('/login', (req, res) => {
    remote.login({
      cluster: 'https://prismic.io',
      email: req.body.email,
      password: req.body.password,
    })
    .then(session => {
      const token = new Buffer(session).toString('base64')

      res.cookie('prismicToken', token, {
        maxAge: 1000 * 60 * 60 * 24 * 300, // cookie lasts 300 days
        httpOnly: true,
        signed: true,
        // secure: true,
      })

      res.status(200).json({
        token,
      })
    })
    .catch(err => {
      console.log(err.message)
      res.status(401).send('Wrong credentials')
    })
  })

  server.post('/logout', (req, res) => {
    res.clearCookie('prismicToken')
    res.status(200).end()
  })

  server.get('/api/source', (req, res) => {
    const url = req.query.url

    parseSource({ url })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err.message,
        })
      })
  })

  server.get('/api/profile/me', (req, res) => {
    const token = extractToken(req.headers.authorization)

    remote.me({
      cluster: 'https://prismic.io',
      session: new Buffer(token, 'base64').toString('utf8')
    })
    .then(profile => {
      res.status(200).json(profile)
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Internal error')
    })
  })

  server.get('/api/repositories', (req, res) => {
    const token = extractToken(req.headers.authorization)

    remote.listRepositories({
      cluster: 'https://prismic.io',
      session: new Buffer(token, 'base64').toString('utf8')
    })
    .then(repositories => {
      res.status(200).json(repositories)
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Internal error')
    })
  })

  server.post('/api/repositories', (req, res) => {
    const token = extractToken(req.headers.authorization)

    remote.addRepository({
      cluster: 'https://prismic.io',
      session: new Buffer(token, 'base64').toString('utf8'),
      repository: req.body.name,
    })
    .then(isSuccessful => {
      res.status(200).json({
        url: `http://${req.body.name}.prismic.io`,
        name: req.body.name,
      })
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Internal error')
    })
  })

  server.post('/api/mask', (req, res) => {
    const token = extractToken(req.headers.authorization)

    remote.saveMask({
      maskName: req.body.name,
      maskJSON: req.body.mask,
      cluster: 'https://prismic.io',
      session: new Buffer(token, 'base64').toString('utf8'),
      repository: req.body.repository,
    })
    .then(isSuccessful => {
      res.status(200).json({
        mask: req.body.name,
      })
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Internal error')
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
