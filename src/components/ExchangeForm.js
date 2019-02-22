import React, { useState, useReducer, useEffect, useRef } from 'react'
import { handleActions } from '../utils/redux'
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

const CurrencySelector = ({ except, ...props }) => (
  <select {...props}>
    {CURRENCIES.filter(value => value !== except).map(value => (
      <option value={value} key={value}>
        {value}
      </option>
    ))}
  </select>
)

const convert = value => parseFloat(value).toFixed(2)

const reducer = handleActions({
  focus: (state, { source }) => {
    return { ...state, source }
  },
  input: ({ rate: r }, { value: inputValue, type: source, rate = r }) => {
    return { rate, source, inputValue, outputValue: inputValue * rate }
  },
  output: ({ rate: r }, { value: outputValue, type: source, rate = r }) => {
    return { rate, source, outputValue, inputValue: outputValue / rate }
  },
  forex: ({ source, [`${source}Value`]: value }, { rate }) => {
    return reducer({ rate }, { type: source, value })
  },
})

const init = (value, rate) => reducer({ rate }, { type: 'input', value })

const useForexForm = (initialValue, rate) => {
  const [state, dispatch] = useReducer(reducer, init(initialValue, rate))

  useEffect(() => {
    dispatch({ type: 'forex', rate })
  }, [rate])

  const forms = {
    input: {
      ref: useRef(),
      value: convert(state.inputValue),
      onChange: e => dispatch({ type: 'input', value: e.target.value, rate }),
      onFocus: () => dispatch({ type: 'focus', source: 'input' }),
    },
    output: {
      ref: useRef(),
      value: convert(state.outputValue),
      onChange: e => dispatch({ type: 'output', value: e.target.value, rate }),
      onFocus: () => dispatch({ type: 'focus', source: 'output' }),
    },
  }

  const reset = (value = initialValue) => {
    dispatch({ type: 'input', value, rate })
    if (forms[state.source].ref.current) forms[state.source].ref.current.focus()
  }

  return [state.inputValue, reset, forms]
}

const ExchangeForm = ({ initialAmount = 10 }) => {
  const [from, setFrom] = useFormState('GBP')
  const [to, setTo] = useFormState('EUR')
  const [rate, { online, error }] = useForex(from, to)
  const [amount, reset, forms] = useForexForm(initialAmount, rate)
  const [available, { exchange }] = usePocket(from)
  const overdraft = amount > available
  const enabled = online && !error && !overdraft && amount > 0

  const handleSubmit = event => {
    event.preventDefault()
    exchange({ to, amount: parseFloat(amount), rate })
    reset()
  }

  const flip = event => {
    event.preventDefault()
    event.stopPropagation()
    const current = { to, from }
    setTo(current.from)
    setFrom(current.to)
    reset(amount)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <CurrencySelector value={from} onChange={setFrom} except={to} />
        <input {...forms.input} pattern='\d{1,}(\.\d{2})?' />
        <small>balance: {available}</small>
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
