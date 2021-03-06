// @flow

import { createAction, handleActions } from 'redux-actions'
import { __, contains, find, propEq, reduce } from 'ramda'

const findRepositoryByUrl = (url, repositories) => find(propEq('url', url), repositories)
const makeUrlIndexed = reduce((repositories, repository) => ({ ...repositories,  [repository.url]: repository }), {})
const isFetchingOrFailed = contains(__, ['fetching', 'failed'])

export const setRepositories = createAction('SET_REPOSITORIES')
export const clearRepositories = createAction('CLEAR_REPOSITORIES')
export const addRepository = createAction('ADD_REPOSITORY')
export const selectRepository = createAction('SELECT_REPOSITORY')

export const loadRepositories = ({ token }) => (dispatch) => {
  dispatch(setRepositories('fetching'))

  return fetch('/api/repositories', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response
    }
  })
  .then(response => response.json())
  .then(repositories => {
    dispatch(setRepositories(repositories))
  })
  .catch(err => {
    dispatch(setRepositories('failed'))
  })
}

export const createRepository = ({ token, name }) => (dispatch) => {
  // dispatch(addRepository('fetching'))

  return fetch('/api/repositories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response
    }
  })
  .then(response => response.json())
  .then(repository => {
    dispatch(addRepository(repository))
  })
  .catch(err => {
    // dispatch(addRepository('failed'))
  })
}

export const reducer = handleActions({
  [clearRepositories]: () => ({
    entities: null,
    selected: null,
  }),
  [setRepositories]: (state, { payload }) => ({
    ...state,
    entities: isFetchingOrFailed(payload) ? payload : makeUrlIndexed(payload),
    selected: findRepositoryByUrl(state.selected, payload) ? state.selected : null,
  }),
  [addRepository]: (state, { payload }) => {
    const otherEntities = { ...state.entities }
    delete otherEntities[payload.url]

    const newEntities = {
      [payload.url]: payload,
    }

    return {
      ...state,
      entities: {
        ...newEntities,
        ...otherEntities,
      },
    }
  },
  [selectRepository]: (state, { payload }) => ({
    ...state,
    selected: payload,
  }),
}, {
  entities: null,
  selected: null,
})
