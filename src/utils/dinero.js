export const format = dinero => {
  const precision = dinero.getPrecision()
  const format = precision ? `0.${'0'.repeat(precision)}` : '0'
  return dinero.toFormat(format)
}

export const toAmount = (value, precision = 2) => {
  if (typeof value === 'number') return toAmount(value.toFixed(precision))
  return value.replace('.', '') | 0
}
