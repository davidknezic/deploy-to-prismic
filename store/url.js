// @flow

import { createAction, handleActions } from 'redux-actions'

export const setUrl = createAction('SET_URL')

export const reducer = handleActions({
  [setUrl]: (state, { payload }) => payload ? payload : null ,
}, null)
