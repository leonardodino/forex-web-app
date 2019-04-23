import React from 'react'
import { fireEvent, cleanup, act, waitForElement } from 'react-testing-library'
import renderWithRouter from '../test-utils/render-with-router'
import wrapInProviders from '../test-utils/wrap-in-providers'
import getElements from '../test-utils/get-elements'
import fetchRates from '../api/fetch-rates'
import { BareApp } from './App'

const getFloatValue = string => parseFloat(string.replace(/[^\d.]+/g, ''))
const AppWithoutRouter = wrapInProviders(BareApp)
const renderApp = options => renderWithRouter(<AppWithoutRouter />, options)

beforeAll(() => fireEvent(window, new Event('online')))
afterAll(cleanup)

describe('the happy path', () => {
  expect(fetchRates).toHaveBeenCalledTimes(0)
  const { history, container } = renderApp()
  expect(fetchRates).toHaveBeenCalledTimes(1)

  it('has redirected to the exchange route', () => {
    expect(history.location.pathname).toBe('/exchange/GBPxEUR')
  })

  let exchange, pockets, rate

  it('contains the expected elements', async () => {
    await waitForElement(() => getElements(container).exchange.flip)
    exchange = getElements(container).exchange
    pockets = getElements(container).pockets
    expect(exchange.input).toBeInTheDocument()
    expect(exchange.output).toBeInTheDocument()
    expect(exchange.form).toBeInTheDocument()
    expect(exchange.flip).toBeInTheDocument()
    rate = getFloatValue(exchange.flip.textContent)
  })

  it('correctly exhanges 50GBP into EUR', () => {
    fireEvent.change(exchange.input, { target: { value: '50.00' } })
    fireEvent.submit(exchange.form)

    expect(pockets.GBP.currentAmount()).toBe(50)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100 + 50 * rate)
  })

  it('overdraft if above limit', () => {
    fireEvent.change(exchange.input, { target: { value: '51.00' } })
    fireEvent.submit(exchange.form)

    expect(exchange.submit).toBeDisabled()
    expect(pockets.GBP.currentAmount()).toBe(50)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100 + 50 * rate)
  })

  it('allows editing via output line, and clicking rates links', () => {
    const links = [...pockets.EUR.card.querySelectorAll('a')]
    const link = links.find(element => element.textContent.startsWith('GBP'))

    fireEvent.click(link) // output is now GBP
    fireEvent.change(exchange.output, { target: { value: '50.00' } })

    expect(exchange.submit).not.toBeDisabled()
    fireEvent.submit(exchange.form)

    expect(pockets.GBP.currentAmount()).toBeCloseTo(100, 0)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100, 0)
  })
})

describe('offline / error handling', () => {
  jest.useFakeTimers()
  fetchRates.mockImplementationOnce(() => new Promise(() => {}))

  const { container } = renderApp()

  const getBadge = () => container.querySelector('[class^=NavBar__Badge]')
  const getSubmit = () => getElements(container).exchange.submit
  const getInput = () => getElements(container).exchange.input

  fireEvent.change(getInput(), { target: { value: '50.00' } })

  test('initial: "loading" state', () => {
    expect(getBadge()).toHaveTextContent('loading...')
    expect(getSubmit()).toBeDisabled()
  })

  test('received data: "online" state', async () => {
    await act(async () => { jest.advanceTimersByTime(10000) }) // prettier-ignore
    fireEvent(window, new Event('online'))
    expect(getBadge()).not.toBeInTheDocument()
    expect(getSubmit()).not.toBeDisabled()
  })

  test('connection drop: "offline" state', () => {
    fireEvent(window, new Event('offline'))
    expect(getBadge()).toHaveTextContent('offline')
    expect(getSubmit()).toBeDisabled()
  })

  test('fetch error while online: "loading" state', async () => {
    fetchRates.mockImplementationOnce(() => Promise.reject('api error'))
    fireEvent(window, new Event('online'))
    await act(async () => { jest.advanceTimersByTime(11000) }) // prettier-ignore
    expect(getBadge()).toHaveTextContent('loading...')
    expect(getSubmit()).toBeDisabled()
  })
})
