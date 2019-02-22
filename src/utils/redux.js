export { createAction, handleActions } from 'redux-actions'

const mapValues = fn => obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: fn(value) }),
    {},
  )

export const bindActionCreators = (actionCreators, dispatch) =>
  mapValues(action => (...args) => dispatch(action(...args)))(actionCreators)
