# 🎮 contento-remote

Programmatically perform operations on contento CMS.

  - check if repository exists
  - list all repositories
  - create a repository
  - create/update a mask
  - add a user
  - update user profile
  - accept repository invitations
  - add a preview endpoint
  - change the api visibility


⚠️ **use at your own risk**

# Install

`npm install contento-remote --save`

# API

```javascript
const { login, addPreview, repositoryExists, listRepositories, addRepository, saveMask, updateUser, addUser, apiVisibility } = require('contento-remote');

const cluster = 'https://prismic.io';
const repository = 'my-test-repository';

login({ cluster, email: '__', password: '__' })
  .then(session => {

    // check if repository exists
    return repositoryExists({
      repository,
      cluster
    })

    // list all repositories
    return listRepositories({
      cluster,
      session
    });

    // create a repository
    return addRepository({
      repository,
      cluster,
      session
    });

    // create/update a mask
    return saveMask({
      maskName: 'toto',
      maskJSON: '{ "@title": "Toto", "Main": {} }',
      repository,
      cluster,
      session
    });

    // add a user
    return addUser({
      email: 'test@axa.com',
      repository,
      cluster,
      session
    });

    // update user profile
    return updateUser({
      email: 'test@axa.com',
      profile: 'Manager' // Writer|Manager|Administrator
      repository,
      cluster,
      session
    });

    // add a preview endpoint
    return addPreview({
      previewURL: 'http://my-site.com/_preview',
      previewName: 'website'
      repository,
      cluster,
      session
    });

    // change the api visibility
    return apiVisibility({
      visibility: 'open', // private|public|open
      repository,
      session,
      cluster
    });



  })

```


# Changelog

## 2.0.2

  - repositoryExists
  - listRepositories

## 2.0.1

  - acceptUser

## 2.0.0

  - login
  - addPreview
  - addRepository
  - saveMask
  - updateUser
  - addUser
  - apiVisibility
