/**
 * @jest-environment node
 */
import fetchWithTimeout, { TIMED_OUT } from './fetch-with-timeout'
import { Response } from 'node-fetch'

let resolveFetch, rejectFetch

const backup = global.fetch
beforeAll(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve, reject) => {
        resolveFetch = resolve
        rejectFetch = reject
      }),
  )
})
afterAll(() => {
  global.fetch = backup
})

it('fetches sucessfully before timeout', async () => {
  jest.useFakeTimers()
  const promise = fetchWithTimeout('http://localhost/', { timeout: 500 })
  jest.advanceTimersByTime(100)
  resolveFetch(new Response())
  jest.advanceTimersByTime(100)
  await promise
})

it('defaults to 5s', () => {
  jest.useFakeTimers()
  const backup = global.setTimeout
  const mock = jest.fn().mockName('setTimeout')
  global.setTimeout = mock
  fetchWithTimeout('http://localhost/')
  expect(mock).toHaveBeenCalledWith(expect.any(Function), 5000)
  global.setTimeout = backup
})

it('fetches fails with custom error after timeout', async () => {
  jest.useFakeTimers()
  const promise = fetchWithTimeout('http://localhost/', { timeout: 500 })
  expect(promise).rejects.toThrow(TIMED_OUT)
  jest.advanceTimersByTime(1000)
  resolveFetch(new Response())
  jest.advanceTimersByTime(100)
  try {
    await promise.catch(a => a)
  } catch (e) {}
})

it('passes errors through', async () => {
  jest.useFakeTimers()
  const promise = fetchWithTimeout('http://localhost/', { timeout: 500 })
  const customError = new Error('oops')
  expect(promise).rejects.toThrow(customError)
  jest.advanceTimersByTime(100)
  rejectFetch(customError)
  jest.advanceTimersByTime(100)
  try {
    await promise.catch(a => a)
  } catch (e) {}
})
