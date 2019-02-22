import React, { useState } from 'react'
import { usePockets } from '../hooks/pockets'
import { CURRENCIES } from '../constants'
import useForex from '../hooks/forex'

const useFormState = (...args) => {
  const [state, setter] = useState(...args)
  const handler = event => {
    if (event && event.target && event.target.value)
      return setter(event.target.value)
    return setter(event)
  }
  return [state, handler]
}

const CurrencySelector = props => (
  <select {...props}>
    {CURRENCIES.map(value => (
      <option value={value} key={value}>
        {value}
      </option>
    ))}
  </select>
)

const PocketsDebug = ({ initialAmount = '10.00' }) => {
  const [funds, { exchange }] = usePockets()
  const [amount, setAmount] = useFormState(initialAmount)
  const [from, setFrom] = useFormState('GBP')
  const [to, setTo] = useFormState('EUR')
  const [rate, { online, error }] = useForex(from, to)
  const enabled = online && !error

  const handleSubmit = event => {
    event.preventDefault()
    setAmount(initialAmount)
    exchange({ to, from, amount: parseFloat(amount), rate })
  }

  return (
    <>
      <hr />
      <pre>
        {Object.entries(funds)
          .map(([pair, value]) => `${pair}: ${value}`)
          .join('\n')}
      </pre>
      <hr />
      <form onSubmit={handleSubmit}>
        <CurrencySelector value={from} onChange={setFrom} />
        <CurrencySelector value={to} onChange={setTo} />
        <input value={amount} onChange={setAmount} pattern='\d{1,}\.\d{2}' />
        <button type='submit' disabled={!enabled}>
          exchange
        </button>
      </form>
    </>
  )
}

export default PocketsDebug
