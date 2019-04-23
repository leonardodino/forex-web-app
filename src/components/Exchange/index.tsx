import React, { useReducer, useEffect, useRef } from 'react'
import Dinero from 'dinero.js'
import { Action } from 'redux-actions'
import { invert } from '../../utils/theme'
import { handleActions } from '../../utils/redux'
import { toAmount, format } from '../../utils/dinero'
import useOnlineStatus from '../../hooks/online'
import useForex from '../../hooks/forex'
import { usePocket } from '../../hooks/pockets'
import { InputLine, OutputLine } from './Inputs'
import FlipButton from './FlipButton'
import Button from './SubmitButton'

type Source = 'input' | 'output'
type State = {
  source: Source
  rate: number
  input: Dinero.Dinero
  output: Dinero.Dinero
}

type SourcePayload = { value: string | number }
type FocusPayload = { source: Source }
type ForexPayload = { rate: number }
type InputPayload = { value: string | number; rate?: number }
type PayloadTypes = SourcePayload | FocusPayload | ForexPayload | InputPayload
type ActionTypes = Action<PayloadTypes>
type Dispatch = React.Dispatch<ActionTypes>

type Reducer = (state: State, action: ActionTypes) => State
const reducer: Reducer = handleActions<State>({
  focus: (state, { payload: { source } }: Action<FocusPayload>) => {
    return { ...state, source }
  },
  input: (
    { rate: r },
    { payload: { value, rate = r } }: Action<InputPayload>,
  ) => {
    const input = Dinero({ amount: toAmount(value) })
    const output = input.multiply(rate)
    return { source: 'input', rate, input, output }
  },
  output: (
    { rate: r },
    { payload: { value, rate = r } }: Action<InputPayload>,
  ) => {
    const output = Dinero({ amount: toAmount(value) })
    const input = output.divide(rate)
    return { source: 'output', rate, input, output }
  },
  forex: (
    { source, [source]: dinero },
    { payload: { rate } }: Action<ForexPayload>,
  ) => {
    return reducer({ rate } as State, {
      type: source,
      payload: { value: format(dinero) },
    })
  },
})

const init = ({ value, rate }: { value: number; rate: number }) =>
  reducer({ rate, source: 'input' } as State, {
    type: 'input',
    payload: { value },
  })

const useForexInput = (type: Source, state: State, dispatch: Dispatch) => ({
  ref: useRef<HTMLInputElement>(null),
  value: format(state[type]),
  onChange: (e: any) => dispatch({ type, payload: { value: e.target.value } }),
  onFocus: () => dispatch({ type: 'focus', payload: { source: type } }),
})

const useForexForm = (initialValue: number, rate: number = 0) => {
  const initialState = { value: initialValue, rate }
  const [state, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    if (typeof rate !== 'number') return
    dispatch({ type: 'forex', payload: { rate } })
  }, [rate])

  const forms = {
    input: useForexInput('input', state, dispatch),
    output: useForexInput('output', state, dispatch),
  }

  const reset = (value = initialValue) => {
    dispatch({ type: 'input', payload: { value, rate } })
    const { current: element } = forms[state.source].ref
    if (element) element.focus()
  }

  type ForexForm = [State['input'], typeof reset, typeof forms]
  return [state.input, reset, forms] as ForexForm
}

const usePrevious = (value: any) => {
  const ref = useRef<any>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

type HTMLInputRef = { ref: React.RefObject<HTMLInputElement> }

const selectRef = ({ current }: HTMLInputRef['ref']) => {
  if (!current) return
  current.focus()
  current.select()
}

const useFocus = (
  { input, output }: { input: HTMLInputRef; output: HTMLInputRef },
  { from, to }: { from: string; to: string },
) => {
  const previousFrom = usePrevious(from)
  const previousTo = usePrevious(to)

  useEffect(() => {
    if (previousFrom !== from) return selectRef(input.ref)
    if (previousTo !== to) return selectRef(output.ref)
  }, [from, to, input.ref, output.ref, previousFrom, previousTo])
}

type ExchangeFormProps = {
  initialAmount?: number
  from: string
  to: string
  setFrom: (arg: React.ChangeEvent<HTMLSelectElement> | string) => void
  setTo: (arg: React.ChangeEvent<HTMLSelectElement> | string) => void
}

const ExchangeForm = (props: ExchangeFormProps) => {
  const { initialAmount = 0, from, setFrom, to, setTo, ...other } = props
  const browserOnline = useOnlineStatus()
  const [rate, { online: forexOnline, error }] = useForex(from, to)
  const [requested, reset, forms] = useForexForm(initialAmount, rate)
  const [available, { exchange }] = usePocket(from)
  const overdraft = requested.getAmount() > available.getAmount()
  const online = browserOnline && forexOnline
  const enabled = online && !error && !overdraft && requested.getAmount() > 0

  useFocus(forms, props)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!enabled) return
    const amount = Dinero({ amount: requested.getAmount(), currency: from })
    exchange({ to, amount, rate })
    reset()
  }

  const flip = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      <Button disabled={!enabled}>
        {overdraft ? 'OVERDRAFT!' : 'exchange'}
      </Button>
    </form>
  )
}

/* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
  ExchangeForm.defaultProps = { 'data-testid': 'ExchangeForm' }
}

export default invert(ExchangeForm)
