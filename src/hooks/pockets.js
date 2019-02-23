import React, { createContext, useContext, useReducer } from 'react'
import Dinero from 'dinero.js'
import { toAmount } from '../utils/dinero'
import { createAction, handleActions, bind } from '../utils/redux'
import { CURRENCIES, INITIAL_FUNDS } from '../constants'

const init = ({ currencies, amount = toAmount(INITIAL_FUNDS) }) =>
  currencies.reduce(
    (a, currency) => ({ ...a, [currency]: Dinero({ amount, currency }) }),
    {},
  )

// redux actions and reducer
const actions = { exchange: createAction('EXCHANGE') }

const reducer = handleActions({
  [actions.exchange]: (state, { payload: { amount, to, rate } }) => {
    const from = amount.getCurrency()
    const converted = amount.multiply(rate).getAmount()
    return {
      ...state,
      [from]: state[from].subtract(amount),
      [to]: state[to].add(Dinero({ amount: converted, currency: to })),
    }
  },
})

const noop = () => {}
const createPockets = (currencies = []) => {
  const FundsContext = createContext({})
  const DispatchContext = createContext(noop)

  const Provider = ({ children }) => {
    const [funds, dispatch] = useReducer(reducer, { currencies }, init)
    return (
      <DispatchContext.Provider value={dispatch}>
        <FundsContext.Provider value={funds}>{children}</FundsContext.Provider>
      </DispatchContext.Provider>
    )
  }

  // hooks
  const useActions = () => bind(actions, useContext(DispatchContext))

  const useFunds = () => useContext(FundsContext)
  const useFund = currency => useFunds()[currency]

  const usePockets = () => [useFunds(), useActions()]
  const usePocket = currency => [useFund(currency), useActions()]

  return [Provider, { useFund, useFunds, usePocket, usePockets, useActions }]
}

const [Provider, hooks] = createPockets(CURRENCIES)

const { usePocket, usePockets, useFund, useFunds, useActions } = hooks
export { usePocket, usePockets, useFund, useFunds, useActions, Provider }
