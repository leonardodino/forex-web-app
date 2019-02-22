import React, { createContext, useContext, useReducer } from 'react'
import { createAction, handleActions, bindActionCreators } from '../utils/redux'
import { CURRENCIES, INITIAL_FUNDS } from '../constants'

const getInitialState = ({ currencies }) =>
  currencies.reduce((acc, name) => ({ ...acc, [name]: INITIAL_FUNDS }), {})

// redux actions and reducer
const actions = { exchange: createAction('EXCHANGE') }
const currencyActions = currency => ({
  exchange: payload => actions.exchange({ from: currency, ...payload }),
})

const reducer = handleActions(
  {
    [actions.exchange]: (state, { payload: { from, to, amount, rate } }) => ({
      ...(state || {}),
      [from]: state[from] - amount,
      [to]: state[to] + amount * rate,
    }),
  },
  {},
)
const noop = () => {}
const createPockets = (currencies = []) => {
  const FundsContext = createContext({})
  const DispatchContext = createContext(noop)

  const Provider = ({ children }) => {
    const [funds, dispatch] = useReducer(
      reducer,
      getInitialState({ currencies }),
    )
    return (
      <DispatchContext.Provider value={dispatch}>
        <FundsContext.Provider value={funds}>{children}</FundsContext.Provider>
      </DispatchContext.Provider>
    )
  }

  // hooks
  const useActions = currency =>
    bindActionCreators(
      currency ? currencyActions(currency) : actions,
      useContext(DispatchContext),
    )

  const useFunds = () => useContext(FundsContext)
  const useFund = currency => useFunds()[currency]

  const usePockets = () => [useFunds(), useActions()]
  const usePocket = currency => [useFund(currency), useActions(currency)]

  return [Provider, { useFund, useFunds, usePocket, usePockets, useActions }]
}

const [Provider, hooks] = createPockets(CURRENCIES)

const { usePocket, usePockets, useFund, useFunds, useActions } = hooks
export { usePocket, usePockets, useFund, useFunds, useActions, Provider }
