import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import wrapInProviders from '../../test-utils/wrap-in-providers'
import Exchange from './index'
import waitForEvent from '../../test-utils/wait-for-event'
import { getExchange } from '../../test-utils/get-elements'

const WrappedExchange = wrapInProviders(Exchange)

afterAll(cleanup)

it('renders without crashing', () => {
  render(
    <WrappedExchange
      initialAmount={0}
      from='GBP'
      setFrom={() => {}}
      to='EUR'
      setTo={() => {}}
    />,
  )
})

const getValue = (event: any) =>
  event && event.target ? event.target.value : event

type Elements = ReturnType<typeof getExchange>
const ensure = (elements: Elements) => {
  if (!elements.from) throw new Error('missing "from" input')
  if (!elements.to) throw new Error('missing "to" input')
  return elements as { [P in keyof Elements]: any }
}

describe('currency change propagation', () => {
  const props: any = {
    from: 'GBP',
    to: 'EUR',
    setFrom: jest.fn(e => (props.from = getValue(e))).mockName('setFrom'),
    setTo: jest.fn(e => (props.to = getValue(e))).mockName('setTo'),
  }

  const { container } = render(<WrappedExchange {...props} />)

  const elements = ensure(getExchange(container))

  expect(props.setFrom).not.toBeCalled()
  expect(props.setTo).not.toBeCalled()

  expect(elements.from.value).toBe(props.from)
  expect(elements.to.value).toBe(props.to)

  it('fires setFrom', () => {
    fireEvent.change(elements.from, { target: { value: 'USD' } })

    expect(props.setFrom).toHaveBeenCalledTimes(1)
    expect(props.setTo).toHaveBeenCalledTimes(0)
    expect(props.from).toBe('USD')
  })

  it('fires setTo', () => {
    fireEvent.change(elements.to, { target: { value: 'GBP' } })

    expect(props.setFrom).toHaveBeenCalledTimes(1)
    expect(props.setTo).toHaveBeenCalledTimes(1)
    expect(props.to).toBe('GBP')
  })
})

it('swaps currencies by clicking on the flip button', async () => {
  const props: any = {
    from: 'GBP',
    to: 'EUR',
    setFrom: jest.fn().mockName('setFrom'),
    setTo: jest.fn().mockName('setTo'),
  }

  const { container } = render(<WrappedExchange {...props} />)

  await waitForEvent('click', () => ensure(getExchange(container)).flip)
  expect(props.setFrom).toHaveBeenCalledTimes(1)
  expect(props.setTo).toHaveBeenCalledTimes(1)
  expect(props.setFrom).toHaveBeenLastCalledWith(props.to)
  expect(props.setTo).toHaveBeenLastCalledWith(props.from)
})
