import React, { createContext, useContext, useState } from 'react'
import useInterval from 'use-interval'
import fetchRates from 'api/fetch-rates'
import { INTERVAL, CURRENCIES } from 'app-constants'

const useForexInterval = fn => useInterval(fn, INTERVAL, true)

const createForex = currencies => {
  const ForexContext = createContext({})

  const useForex = (inputCurrency, outputCurrency) => {
    const key = `${inputCurrency}:${outputCurrency}`
    const { [key]: rate, online, updated, error } = useContext(ForexContext)
    return [rate, { online, updated, error, currencies }]
  }

  const useForexState = () => {
    const { online, updated, error, ...rates } = useContext(ForexContext)
    return { online, updated, error, rates, currencies }
  }
  const useCurrencyForex = currency => {
    const { rates: allRates, ...status } = useForexState()
    const rates = Object.entries(allRates).reduce((rates, [key, rate]) => {
      const outputKey = key.replace(`${currency}:`, '')
      if (key !== outputKey) rates[outputKey] = rate
      return rates
    }, {})
    return { rates, ...status }
  }

  const Provider = ({ children }) => {
    const [state, setState] = useState({ online: false, updated: -Infinity })
    // had to replace async / await, it was breaking react tests
    useForexInterval(() => {
      fetchRates(currencies).then(
        rates => setState({ ...rates, online: true, updated: Date.now() }),
        error => setState({ ...state, online: !!console.log(error), error }),
      )
    })

    return (
      <ForexContext.Provider value={state}>{children}</ForexContext.Provider>
    )
  }

  return [Provider, useForex, useForexState, useCurrencyForex]
}

const [Provider, ...hooks] = createForex(CURRENCIES)
const [useForex, useForexState, useCurrencyForex] = hooks
export { Provider, useForexState, useCurrencyForex }
export default useForex
