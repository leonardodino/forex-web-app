import React, { createContext, useContext, useReducer } from 'react'
import Dinero from 'dinero.js'
import { toAmount } from '../utils/dinero'
import { createAction, handleActions, bind } from '../utils/redux'
import { CURRENCIES, INITIAL_FUNDS } from '../constants'

type FundsState = { [key: string]: Dinero.Dinero }
type ExchangePayload = { amount: Dinero.Dinero; to: string; rate: number }

const init = ({
  currencies,
  amount = toAmount(INITIAL_FUNDS),
}: {
  currencies: string[]
  amount?: number
}): FundsState =>
  currencies.reduce(
    (a, currency) => ({ ...a, [currency]: Dinero({ amount, currency }) }),
    {},
  )

// redux actions and reducer
const actions = { exchange: createAction<ExchangePayload>('EXCHANGE') }

// [TODO]: fix action type validation
type Actions = { [key in keyof typeof actions]: ReturnType<typeof bind>['x'] }
type Pt<T = Dinero.Dinero> = [T, Actions]

const reducer = handleActions<FundsState, ExchangePayload>({
  [`${actions.exchange}`]: (state, { payload: { amount, to, rate } }) => {
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
const createPockets = (currencies: string[]) => {
  const FundsContext = createContext<FundsState>({})
  const DispatchContext = createContext(noop)

  const Provider: React.FunctionComponent = ({ children }) => {
    const [funds, dispatch] = useReducer(reducer, { currencies }, init)
    return (
      <DispatchContext.Provider value={dispatch as () => void}>
        <FundsContext.Provider value={funds}>{children}</FundsContext.Provider>
      </DispatchContext.Provider>
    )
  }

  // hooks
  const useActions = () => bind(actions, useContext(DispatchContext))

  const useFunds = () => useContext(FundsContext)
  const useFund = (currency: string) => useFunds()[currency]

  const usePockets = (): Pt<FundsState> => [useFunds(), useActions()]
  const usePocket = (currency: string): Pt => [useFund(currency), useActions()]

  return { Provider, useFund, useFunds, usePocket, usePockets, useActions }
}

const { Provider, ...hooks } = createPockets(CURRENCIES)

const { usePocket, usePockets, useFund, useFunds, useActions } = hooks
export { usePocket, usePockets, useFund, useFunds, useActions, Provider }
