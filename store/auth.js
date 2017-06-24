// @flow

import { createAction, handleActions } from 'redux-actions'

export const setToken = createAction('SET_TOKEN')

type Auth = 'fetching' | 'failed' | string

export const login = ({ email, password }) => (dispatch) => {
  dispatch(setToken('fetching'))

  return fetch('/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(token => {
    dispatch(setToken(token))
  })
  .catch(err => {
    dispatch(setToken('failed'))
  })
}

export const logout = () => (dispatch) => {
  dispatch(setToken(null))

  return fetch('/logout', {
    method: 'POST',
    credentials: 'include',
  })
}

export const reducer = handleActions({
  [setToken]: (state, { payload }) => payload ? payload : null ,
}, null)
