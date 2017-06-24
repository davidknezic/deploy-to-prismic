// @flow

import { createAction, handleActions } from 'redux-actions'

export const setRepositories = createAction('SET_REPOSITORIES')
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
  .then(response => response.json())
  .then(repositories => {
    dispatch(setRepositories(repositories))
  })
  .catch(err => {
    dispatch(setRepositories('failed'))
  })
}

export const createRepository = ({ token, name }) => (dispatch) => {
  dispatch(addRepository('fetching'))

  return fetch('/api/repositories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
  .then(response => response.json())
  .then(repository => {
    dispatch(addRepository(repository))
  })
  .catch(err => {
    dispatch(addRepository('failed'))
  })
}

export const reducer = handleActions({
  [setRepositories]: (state, { payload }) => payload,
  [addRepository]: (state, { payload }) => {
    let newState = state

    if (!Array.isArray(state)) {
      newState = []
    }

    if (typeof newState[0] === 'string') {
      newState = newState.splice(1)
    }

    return [payload, ...newState]
  },
  [selectRepository]: (state, { payload }) => state.map(repository => ({
    ...repository,
    isSelected: repository.url === payload ? true : undefined,
  })),
}, null)
