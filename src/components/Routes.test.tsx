import React from 'react'
import { fireEvent, cleanup } from 'react-testing-library'
import render from '../test-utils/render-with-router'
import wrapInProviders from '../test-utils/wrap-in-providers'
import getElements from '../test-utils/get-elements'
import BareRoutes from './Routes'

const Routes = wrapInProviders(BareRoutes)
type RouterOptions = Parameters<typeof render>[1]
const renderRoutes = (options?: RouterOptions) => render(<Routes />, options)

beforeEach(jest.useFakeTimers)
afterAll(cleanup)

const getValues = ({
  from,
  to,
}: ReturnType<typeof getElements>['exchange']) => ({
  from: from ? from.value : '',
  to: to ? to.value : '',
})

describe('router currency change', () => {
  const { history, container } = renderRoutes()
  const { exchange } = getElements(container)
  if (!exchange.from) throw new Error('missing from')
  if (!exchange.to) throw new Error('missing to')

  it('before: GBPxEUR', () => {
    expect(history.location.pathname).toBe('/exchange/GBPxEUR')
    expect(getValues(exchange)).toMatchObject({ from: 'GBP', to: 'EUR' })
  })

  it('after: GBPxUSD', () => {
    if (!exchange.to) throw new Error('"to" is missing from the DOM')
    fireEvent.change(exchange.to, { target: { value: 'USD' } })
    expect(history.location.pathname).toBe('/exchange/GBPxUSD')
    expect(getValues(exchange)).toMatchObject({ from: 'GBP', to: 'USD' })
  })
})

describe('router currency swap', () => {
  const { history, container } = renderRoutes()
  const { exchange } = getElements(container)

  it('before: GBPxEUR', () => {
    expect(history.location.pathname).toBe('/exchange/GBPxEUR')
    expect(getValues(exchange)).toMatchObject({ from: 'GBP', to: 'EUR' })
  })

  it('after: EURxGBP', () => {
    if (!exchange.from) throw new Error('"from" is missing from the DOM')
    fireEvent.change(exchange.from, { target: { value: 'EUR' } })
    expect(history.location.pathname).toBe('/exchange/EURxGBP')
    expect(getValues(exchange)).toMatchObject({ from: 'EUR', to: 'GBP' })
  })
})

describe('404 page', () => {
  const { history, getByText, container } = renderRoutes({
    route: '/exchange/BRLxEUR',
  })

  it('has kept the non existant route', () => {
    expect(history.location.pathname).toBe('/exchange/BRLxEUR')
  })

  it('does not render the app (exchange/pockets)', () => {
    expect(() => getElements(container)).toThrow()
  })

  it('renders 404', () => {
    expect(getByText('404')).toBeInTheDocument()
  })
})
