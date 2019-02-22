import React, { createContext, useContext, useState } from 'react'
import useInterval from 'use-interval'
import fetchRates from '../api/fetch-rates'
import { INTERVAL, CURRENCIES } from '../constants'

const useForexInterval = fn => useInterval(fn, INTERVAL, true)

const createForex = (currencies = []) => {
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

  const Provider = ({ children }) => {
    const [state, setState] = useState({ online: false, updated: -Infinity })
    useForexInterval(async () => {
      try {
        const rates = await fetchRates(currencies)
        const updated = Date.now()
        setState({ ...rates, online: true, updated })
      } catch (error) {
        console.log(error)
        setState({ ...state, online: false, error })
      }
    })

    return (
      <ForexContext.Provider value={state}>{children}</ForexContext.Provider>
    )
  }

  return [Provider, useForex, useForexState]
}

const [Provider, useForex, useForexState] = createForex(CURRENCIES)
export { Provider, useForexState }
export default useForex
