import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  act,
  waitForElement,
} from 'react-testing-library'
import { renderWithRouter } from '../test-utils/render-with-router'
import wrapInProviders from '../test-utils/wrap-in-providers'
import getElements from '../test-utils/get-elements'
import fetchRates from '../api/fetch-rates'
import App, { BareApp } from './App'

type RouterOptions = Parameters<typeof renderWithRouter>[1]

const getFloatValue = (str: string) => parseFloat(str.replace(/[^\d.]+/g, ''))
const WrappedApp = wrapInProviders(BareApp)
const renderApp = (options?: RouterOptions) =>
  renderWithRouter(<WrappedApp />, options)

beforeAll(() => fireEvent(window, new Event('online')))
afterAll(cleanup)

describe('the happy path', () => {
  expect(fetchRates).toHaveBeenCalledTimes(0)
  const { history, container } = renderApp()
  expect(fetchRates).toHaveBeenCalledTimes(1)

  it('has redirected to the exchange route', () => {
    expect(history.location.pathname).toBe('/exchange/GBPxEUR')
  })
  type Elements = ReturnType<typeof getElements>
  let exchange: Elements['exchange'], pockets: Elements['pockets'], rate: number

  it('contains the expected elements', async () => {
    await waitForElement(() => getElements(container).exchange.flip)
    exchange = getElements(container).exchange
    pockets = getElements(container).pockets
    expect(exchange.input).toBeInTheDocument()
    expect(exchange.output).toBeInTheDocument()
    expect(exchange.form).toBeInTheDocument()
    expect(exchange.flip).toBeInTheDocument()
    expect(exchange!.flip!.textContent).not.toBeNull()
    rate = getFloatValue(exchange!.flip!.textContent as string)
  })

  it('correctly exhanges 50GBP into EUR', () => {
    fireEvent.change(exchange!.input as Element, { target: { value: '50.00' } })
    fireEvent.submit(exchange.form)

    expect(pockets.GBP.currentAmount()).toBe(50)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100 + 50 * rate)
  })

  it('overdraft if above limit', () => {
    fireEvent.change(exchange!.input as Element, { target: { value: '51.00' } })
    fireEvent.submit(exchange.form)

    expect(exchange.submit).toBeDisabled()
    expect(pockets.GBP.currentAmount()).toBe(50)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100 + 50 * rate)
  })

  it('allows editing via output line, and clicking rates links', () => {
    const links = Array.from(pockets.EUR.card.querySelectorAll('a'))
    const link = links.find(element => element!.textContent!.startsWith('GBP'))

    if (!link) throw new Error('could not find a rate link to click')

    fireEvent.click(link) // output is now GBP
    fireEvent.change(exchange!.output as any, { target: { value: '50.00' } })

    expect(exchange.submit).not.toBeDisabled()
    fireEvent.submit(exchange.form)

    expect(pockets.GBP.currentAmount()).toBeCloseTo(100, 0)
    expect(pockets.EUR.currentAmount()).toBeCloseTo(100, 0)
  })

  it('flips currency', async () => {
    expect(exchange.from!.value).toBe('EUR')
    expect(exchange.to!.value).toBe('GBP')

    fireEvent.click(exchange.flip!)

    expect(exchange.from!.value).toBe('GBP')
    expect(exchange.to!.value).toBe('EUR')

    fireEvent.change(exchange.from!, { target: { value: 'USD' } })

    expect(exchange.from!.value).toBe('USD')
    expect(exchange.to!.value).toBe('EUR')
  })
})

describe('offline / error handling', () => {
  jest.useFakeTimers()
  !(fetchRates as jest.Mock).mockImplementationOnce(() => new Promise(() => {}))

  const { container } = renderApp()

  const getBadge = () => container.querySelector('[class^=NavBar__Badge]')
  const getSubmit = () => getElements(container)!.exchange!.submit as Element
  const getInput = () => getElements(container)!.exchange!.input as Element

  fireEvent.change(getInput(), { target: { value: '50.00' } })

  test('initial: "loading" state', () => {
    expect(getBadge()).toHaveTextContent('loading...')
    expect(getSubmit()).toBeDisabled()
  })

  test('received data: "online" state', async () => {
    await act(async () => jest.advanceTimersByTime(10000))
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
    jest.spyOn(global.console, 'log').mockImplementation(() => {}) // hide console.log
    !(fetchRates as jest.Mock).mockImplementationOnce(() => Promise.reject(''))

    fireEvent(window, new Event('online'))
    await act(async () => jest.advanceTimersByTime(11000))
    expect(getBadge()).toHaveTextContent('loading...')
    expect(getSubmit()).toBeDisabled()
  })
})

describe('router', () => {
  render(<App />)
  expect(window.location.pathname).toBe('/forex-web-app/exchange/GBPxEUR')
})
