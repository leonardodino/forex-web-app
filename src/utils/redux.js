import { handleActions as originalHandle } from 'redux-actions'
export { createAction } from 'redux-actions'

const mapValues = fn => obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: fn(value) }),
    {},
  )

export const handleActions = (reducerMap, initialState = {}, options) =>
  originalHandle(reducerMap, initialState, options)

export const bindActionCreators = (actionCreators, dispatch) =>
  mapValues(action => (...args) => dispatch(action(...args)))(actionCreators)

export { bindActionCreators as bind }
