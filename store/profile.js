// @flow

import { createAction, handleActions } from 'redux-actions'

export const setProfile = createAction('SET_PROFILE')

export const loadProfile = ({ token }) => (dispatch) => {
  dispatch(setProfile('fetching'))

  return fetch('/api/profile/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then(profile => {
    dispatch(setProfile(profile))
  })
  .catch(err => {
    dispatch(setProfile('failed'))
  })
}

export const reducer = handleActions({
  [setProfile]: (state, { payload }) => payload,
}, null)
