const remote = require('../contento-remote')

const extractToken = header => (header || '').toString().slice('Bearer '.length)

export const login = (req, res) => {
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
}

export const logout = (req, res) => {
  res.clearCookie('prismicToken')
  res.status(200).end()
}

export const profile = (req, res) => {
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
}

export const listRepositories = (req, res) => {
  const token = extractToken(req.headers.authorization)

  remote.listRepositories({
    cluster: 'https://prismic.io',
    session: new Buffer(token, 'base64').toString('utf8')
  })
  .then(repositories => repositories.map(repository => {
    const pattern = /:\/\/([^\.]+)/

    return {
      ...repository,
      displayName: repository.name,
      name: repository.url.match(pattern)[1],
    }
  }))
  .then(repositories => {
    res.status(200).json(repositories)
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).send('Internal error')
  })
}

export const createRepository = (req, res) => {
  const token = extractToken(req.headers.authorization)

  remote.addRepository({
    cluster: 'https://prismic.io',
    session: new Buffer(token, 'base64').toString('utf8'),
    repository: req.body.name,
  })
  .then(isSuccessful => {
    res.status(200).json({
      url: `http://${req.body.name}.prismic.io`,
      displayName: req.body.name,
      name: req.body.name,
      userCount: 1,
      avatarUrl: null,
      avatarColor: 'rgb(255, 194, 68)',
    })
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).send('Internal error')
  })
}

export const createCustomType = (req, res) => {
  const token = extractToken(req.headers.authorization)

  remote.saveMask({
    maskName: req.body.name,
    maskJSON: JSON.stringify(req.body.customType),
    cluster: 'https://prismic.io',
    session: new Buffer(token, 'base64').toString('utf8'),
    repository: req.body.repository,
  })
  .then(isSuccessful => {
    res.status(200).json({
      status: 'success',
    })
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).send('Internal error')
  })
}
