import { handleActions as handleReduxActions, ReducerMap } from 'redux-actions'
export { createAction } from 'redux-actions'

const mapValues = <M extends { [key: string]: any }, R>(
  fn: (i: M[keyof M]) => R,
  obj: M,
) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: fn(value) }),
    {} as { [P in keyof M]: R },
  )

export const handleActions = <State, Payload = any>(
  reducerMap: ReducerMap<State, Payload>,
) => handleReduxActions<State, Payload>(reducerMap, {} as State)

type ActionCreator<A> = (...args: any[]) => A

type ActionCreatorsMapObject<A = any> = { [key: string]: ActionCreator<A> }

export const bindActionCreators = <A, M extends ActionCreatorsMapObject<A>>(
  actionCreators: M,
  dispatch: <A>(action: A) => void,
) =>
  mapValues(
    action => (...args: any[]) => dispatch<A>(action(...args)),
    actionCreators,
  )

export { bindActionCreators as bind }
