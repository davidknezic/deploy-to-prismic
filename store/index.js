// @flow

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createAction, handleActions } from 'redux-actions'
import { composeWithDevTools } from 'redux-devtools-extension'

import * as auth from './auth'
import * as profile from './profile'
import * as repositories from './repositories'
import * as source from './source'
import * as url from './url'

const reducer = combineReducers({
  auth: auth.reducer,
  profile: profile.reducer,
  repositories: repositories.reducer,
  source: source.reducer,
  url: url.reducer,
})

export const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  ))
}
