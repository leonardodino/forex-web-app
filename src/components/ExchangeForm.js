import React, { useState } from 'react'
import useForex from '../hooks/forex'
import { usePocket } from '../hooks/pockets'
import { CURRENCIES } from '../constants'

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

const convert = value => parseFloat(value).toFixed(2)

const ExchangeForm = ({ initialAmount = '10.00' }) => {
  const [from, setFrom] = useFormState('GBP')
  const [to, setTo] = useFormState('EUR')
  const [amount, setAmount] = useFormState(initialAmount)
  const [rate, { online, error }] = useForex(from, to)
  const [available, { exchange }] = usePocket(from)
  const overdraft = amount > available
  const enabled = online && !error && !overdraft

  const handleSubmit = event => {
    event.preventDefault()
    setAmount(initialAmount)
    exchange({ to, amount: parseFloat(amount), rate })
  }

  const flip = event => {
    event.preventDefault()
    const current = { to, from }
    setTo(current.from)
    setFrom(current.to)
  }

  const setConverted = ({ target: { value } }) =>
    setAmount((parseFloat(value) / rate).toFixed(2))

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <CurrencySelector value={from} onChange={setFrom} />
        <input value={amount} onChange={setAmount} pattern='\d{1,}(\.\d{2})?' />
      </div>
      <br />
      <button onClick={flip}>FLIP</button>
      <br />
      <div style={{ display: 'flex' }}>
        <CurrencySelector value={to} onChange={setTo} />
        <input
          value={convert(amount * rate)}
          onChange={setConverted}
          pattern='\d{1,}\.\d{2}'
        />
      </div>
      <br />
      <button type='submit' disabled={!enabled}>
        {overdraft ? 'OVERDRAFT!' : 'exchange'}
      </button>
    </form>
  )
}

export default ExchangeForm
