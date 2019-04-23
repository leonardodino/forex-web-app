import React, { createContext, useContext, useState } from 'react'
import useInterval from 'use-interval'
import { Omit } from 'utility-types'
import fetchRates from '../api/fetch-rates'
import { INTERVAL, CURRENCIES } from '../constants'

const useForexInterval = (fn: () => void) => useInterval(fn, INTERVAL, true)
const logError = (...args: any[]) => !!+console.log(...args)

type Rates = { [pair: string]: number }

// prettier-ignore
type ForexState = { online?: boolean, updated?: number, error?: Error, rates: Rates }

// prettier-ignore
const initialState: ForexState = { rates: {}, online: false, updated: -Infinity }

const createForex = (currencies: string[]) => {
  const ForexContext = createContext<ForexState>(initialState)

  const useForexState = () => {
    const { online, updated, error, rates } = useContext(ForexContext)
    return { online, updated, error, rates, currencies }
  }

  const useForex = (
    inputCurrency: string,
    outputCurrency: string,
  ): [number, Omit<ReturnType<typeof useForexState>, 'rates'>] => {
    const { rates, ...state } = useForexState()
    return [rates[`${inputCurrency}:${outputCurrency}`], state]
  }

  const useCurrencyForex = (currency: string) => {
    const { rates: allRates, ...state } = useForexState()
    const rates = Object.entries(allRates).reduce<Rates>(
      (rates, [key, rate]) => {
        const outputKey = key.replace(`${currency}:`, '')
        if (key !== outputKey) rates[outputKey] = rate
        return rates
      },
      {},
    )
    return { rates, ...state }
  }

  const Provider: React.FunctionComponent = ({ children }) => {
    const [state, setState] = useState<ForexState>(initialState)
    // had to replace async / await, it was breaking react tests

    useForexInterval(() => {
      fetchRates(currencies).then(
        rates => setState({ rates, online: true, updated: Date.now() }),
        error => setState({ ...state, online: logError(error), error }),
      )
    })

    return (
      <ForexContext.Provider value={state}>{children}</ForexContext.Provider>
    )
  }

  return { Provider, useForex, useForexState, useCurrencyForex }
}

const { Provider, ...hooks } = createForex(CURRENCIES)
const { useForexState, useCurrencyForex } = hooks
export { Provider, useForexState, useCurrencyForex }
export default hooks.useForex
