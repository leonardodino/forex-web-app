import React, { useReducer, useEffect, useRef } from 'react'
import useOnlineStatus from '@rehooks/online-status'
import Dinero from 'dinero.js'
import { invert } from '../../utils/theme'
import { handleActions } from '../../utils/redux'
import { toAmount, format } from '../../utils/dinero'
import useForex from '../../hooks/forex'
import { usePocket } from '../../hooks/pockets'
import { InputLine, OutputLine } from './Inputs'
import FlipButton from './FlipButton'
import Button from './SubmitButton'

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

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const selectRef = ({ current } = {}) => {
  if (!current) return
  current.focus()
  current.select()
}

const useFocus = ({ input, output }, { from, to }) => {
  const previousFrom = usePrevious(from)
  const previousTo = usePrevious(to)

  useEffect(() => {
    if (previousFrom !== from) return selectRef(input.ref)
    if (previousTo !== to) return selectRef(output.ref)
  }, [from, to])
}

const ExchangeForm = props => {
  const { initialAmount = 0, from, setFrom, to, setTo, ...other } = props
  const browserOnline = useOnlineStatus()
  const [rate, { online: forexOnline, error }] = useForex(from, to)
  const [requested, reset, forms] = useForexForm(initialAmount, rate)
  const [available, { exchange }] = usePocket(from)
  const overdraft = requested.getAmount() > available.getAmount()
  const online = browserOnline && forexOnline
  const enabled = online && !error && !overdraft && requested.getAmount() > 0

  useFocus(forms, props)

  const handleSubmit = event => {
    event.preventDefault()
    if (!enabled) return
    const amount = Dinero({ amount: requested.getAmount(), currency: from })
    exchange({ to, amount, rate })
    reset()
  }

  const flip = event => {
    event.preventDefault()
    const current = { to, from }
    setTo(current.from)
    setFrom(current.to)
  }

  return (
    <form {...other} onSubmit={handleSubmit}>
      <InputLine currency={from} setCurrency={setFrom} form={forms.input} />
      <FlipButton.Absolute rate={rate} onClick={flip} />
      <OutputLine currency={to} setCurrency={setTo} form={forms.output} />
      <Button type='submit' disabled={!enabled}>
        {overdraft ? 'OVERDRAFT!' : 'exchange'}
      </Button>
    </form>
  )
}

/* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
  ExchangeForm.defaultProps = { 'data-testid': 'ExchangeForm' }
}

export default invert(ExchangeForm)
