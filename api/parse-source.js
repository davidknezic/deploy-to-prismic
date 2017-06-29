const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
const { both, find, propEq } = require('ramda')

const pattern = /^https:\/\/github.com\/([a-z0-9-_]+)\/([a-z0-9-_]+)(\/tree\/([a-z0-9-_]+)(.*)?)?$/
const isDir = propEq('type', 'dir')
const isFile = propEq('type', 'file')
const findCustomTypesDir = find(both(propEq('name', 'custom-types'), isDir))

module.exports = ({ url }) => {
  if (!url || !url['match']) {
    throw new Error(`No or invalid "url" provided.`)
  }

  const matches = url.match(pattern)

  if (!matches) {
    throw new Error(`Provided "url" is unsupported. Please make sure it's a github.com url and points to a repository.`)
  }

  const owner = matches[1]
  const repo = matches[2]
  const ref = matches[4]
  const path = matches[5] ? matches[5] : ''

  return requestContent(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, ref)
    .then(response => {
      if (response.statusCode !== 200) throw new Error(response.body.message)
      if (!Array.isArray(response.body)) throw new Error(`The url needs to point to the project's root folder.`)
      return response.body
    })
    .then(entries => {
      const customTypesDir = findCustomTypesDir(entries)
      const customTypesPromise = customTypesDir
        ? requestCustomTypes(customTypesDir.url, ref)
        : Promise.resolve(null)

      return Promise.all([
        customTypesPromise,
      ])
    })
    .then(results => {
      return {
        owner,
        repo,
        ref,
        path,
        customTypes: results[0],
      }
    })
}

function requestCustomTypes(url, ref) {
  return requestContent(url, ref)
    .then(response => {
      if (response.statusCode !== 200) throw new Error(response.body.message)
      if (!Array.isArray(response.body)) throw new Error(`The url needs to point to the project's root folder.`)
      return response.body
    })
    .then(entries => {
      return Promise.reduce(entries, (customTypes, entry) => {
        return requestContent(entry.download_url, ref)
          .then(response => {
            if (response.statusCode !== 200) throw new Error(response.body.message)
            return {
              ...customTypes,
              [`${entry.name.replace('.json', '')}`]: response.body,
            }
          })
      }, {})
    })
}

function requestContent(url, ref) {
  const authHeader = process.env.GITHUB_USERNAME && process.env.GITHUB_TOKEN
    ? `Basic ${new Buffer([process.env.GITHUB_USERNAME, process.env.GITHUB_TOKEN].join(':')).toString('base64')}`
    : undefined

  return request({
    url,
    method: 'GET',
    headers: {
      'User-Agent': 'Deploy to Prismic',
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    json: true,
    qs: {
      ref,
    },
  })
}
