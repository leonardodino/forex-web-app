import Dinero from 'dinero.js'

export const format = (dinero: Dinero.Dinero) => {
  const precision = dinero.getPrecision()
  const format = precision ? `0.${'0'.repeat(precision)}` : '0'
  return dinero.toFormat(format)
}

export const toAmount = (value: number | string, precision = 2): number => {
  if (typeof value === 'number') return toAmount(value.toFixed(precision))
  return parseInt(value.replace('.', ''), 10)
}
