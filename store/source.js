// @flow

import { createAction, handleActions } from 'redux-actions'
import queryString from 'query-string'

export const setSource = createAction('SET_SOURCE')

export const loadSource = ({ url }) => (dispatch) => {
  dispatch(setSource('fetching'))

  return fetch(`/api/source?${queryString.stringify({ url })}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(source => {
    dispatch(setSource(source))
  })
  .catch(err => {
    console.log(err)
    dispatch(setSource('failed'))
  })
}

export const reducer = handleActions({
  [setSource]: (state, { payload }) => payload ? payload : null ,
}, null)
