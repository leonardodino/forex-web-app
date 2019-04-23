export const TIMED_OUT = new Error('Fetch Timeout')

type Options = RequestInit & { timeout?: number }

const fetchWithTimeout = (
  url: RequestInfo,
  { timeout = 5000, ...options }: Options = {},
): Promise<Response> =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(TIMED_OUT), timeout)
    return fetch(url, options).then(
      res => (clearTimeout(id), resolve(res)), // eslint-disable-line no-sequences
      err => (clearTimeout(id), reject(err)), // eslint-disable-line no-sequences
    )
  })

export default fetchWithTimeout
