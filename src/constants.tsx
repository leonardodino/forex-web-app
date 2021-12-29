const API_KEY = process.env.REACT_APP_API_KEY
const API_BASE = process.env.REACT_APP_API_BASE

export const INTERVAL = 1e4 // 10 seconds
export const API_URL = `${API_BASE}?api_key=${API_KEY}`
export const CURRENCIES = ['GBP', 'EUR', 'USD']
export const INITIAL_FUNDS = 100
export const BASENAME = '/forex-web-app'
