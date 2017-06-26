const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const next = require('next')

const parseSource = require('./api/parse-source')
const {
  createCustomType,
  createRepository,
  listRepositories,
  login,
  logout,
  profile,
} = require('./api/prismic')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({
    extended: true
  }))
  server.use(bodyParser.json())
  server.use(cookieParser('change it'))

  server.post('/login', login)
  server.post('/logout', logout)

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

  server.get('/api/profile/me', profile)
  server.get('/api/repositories', listRepositories)
  server.post('/api/repositories', createRepository)
  server.post('/api/custom-type', createCustomType)

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
