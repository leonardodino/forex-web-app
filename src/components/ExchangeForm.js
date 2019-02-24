import React, { useState, useReducer, useEffect, useRef } from 'react'
import Dinero from 'dinero.js'
import { handleActions } from '../utils/redux'
import { toAmount, format } from '../utils/dinero'
import useForex from '../hooks/forex'
import { usePocket } from '../hooks/pockets'
import { CURRENCIES } from '../constants'

const useFormState = initialState => {
  const [state, setter] = useState(initialState)

  const handler = event => {
    setter(event && event.target ? event.target.value : event)
  }

  return [state, handler]
}

const CurrencySelector = ({ except, ...props }) => (
  <select {...props}>
    {CURRENCIES.filter(value => value !== except).map(value => (
      <option value={value} key={value}>
        {value}
      </option>
    ))}
  </select>
)

const reducer = handleActions({
  focus: (state, { source }) => {
    return { ...state, source }
  },
  input: ({ rate: r }, { value, rate = r }) => {
    const input = Dinero({ amount: toAmount(value) })
    const output = input.multiply(rate)
    return { source: 'input', rate, input, output }
  },
  output: ({ rate: r }, { value, rate = r }) => {
    const output = Dinero({ amount: toAmount(value) })
    const input = output.divide(rate)
    return { source: 'output', rate, input, output }
  },
  forex: ({ source, [source]: dinero }, { rate }) => {
    return reducer({ rate }, { type: source, value: format(dinero) })
  },
})

const init = ({ value, rate }) => reducer({ rate }, { type: 'input', value })

const useForexInput = (type, state, dispatch) => ({
  ref: useRef(),
  value: format(state[type]),
  onChange: e => dispatch({ type, value: e.target.value }),
  onFocus: () => dispatch({ type: 'focus', source: type }),
})

const useForexForm = (initialValue, rate = 0) => {
  const initialState = { value: initialValue, rate }
  const [state, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    if (typeof rate !== 'number') return
    dispatch({ type: 'forex', rate })
  }, [rate])

  const forms = {
    input: useForexInput('input', state, dispatch),
    output: useForexInput('output', state, dispatch),
  }

  const reset = (value = initialValue) => {
    dispatch({ type: 'input', value, rate })
    if (forms[state.source].ref.current) forms[state.source].ref.current.focus()
  }

  return [state.input, reset, forms]
}

const ExchangeForm = ({ initialAmount = 10 }) => {
  const [from, setFrom] = useFormState('GBP')
  const [to, setTo] = useFormState('EUR')
  const [rate, { online, error }] = useForex(from, to)
  const [requested, reset, forms] = useForexForm(initialAmount, rate)
  const [available, { exchange }] = usePocket(from)
  const overdraft = requested.getAmount() > available.getAmount()
  const enabled = online && !error && !overdraft && requested.getAmount() > 0

  const handleSubmit = event => {
    event.preventDefault()
    const amount = Dinero({ amount: requested.getAmount(), currency: from })
    exchange({ to, amount, rate })
    reset()
  }

  const flip = event => {
    event.preventDefault()
    event.stopPropagation()
    const current = { to, from }
    setTo(current.from)
    setFrom(current.to)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <CurrencySelector value={from} onChange={setFrom} except={to} />
        <input {...forms.input} pattern='\d{1,}(\.\d{2})?' />
        <small>balance: {format(available)}</small>
      </div>
      <br />
      <button onClick={flip} type='button'>
        FLIP
      </button>
      <br />
      <div style={{ display: 'flex' }}>
        <CurrencySelector value={to} onChange={setTo} except={from} />
        <input {...forms.output} pattern='\d{1,}(\.\d{2})?' />
      </div>
      <br />
      <button type='submit' disabled={!enabled}>
        {overdraft ? 'OVERDRAFT!' : 'exchange'}
      </button>
    </form>
  )
}

export default ExchangeForm
