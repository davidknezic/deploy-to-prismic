// @flow

import { createAction, handleActions } from 'redux-actions'

export const clearProgress = createAction('CLEAR_PROGRESS')

const setCustomTypeStatus = createAction('SET_CUSTOM_TYPE')

const deployCustomType = ({ customType, name, repository, token }) => (dispatch) => {
  dispatch(setCustomTypeStatus({ name, status: 'deploying' }))

  return fetch('/api/custom-type', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customType, name, repository }),
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response
    }
  })
  .then(() => {
    dispatch(setCustomTypeStatus({ name, status: 'success' }))
  })
  .catch(err => {
    dispatch(setCustomTypeStatus({ name, status: 'failed' }))
  })
}

export const deploy = ({ customTypes, repository, token }) => (dispatch) => {
  const customTypePromises = Object.keys(customTypes).map(name => {
    return dispatch(deployCustomType({
      customType: customTypes[name],
      name,
      repository,
      token,
    }))
  })

  return Promise.all(customTypePromises)
}

export const reducer = handleActions({
  [clearProgress]: () => null,
  [setCustomTypeStatus]: (state, { payload: { name, status } }) => {
    const customTypes = state ? state.customTypes || {} : {}

    customTypes[name] = status

    return ({
      ...(state || {}),
      customTypes,
    })
  },
}, null)
