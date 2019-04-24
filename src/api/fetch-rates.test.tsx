jest.unmock('./fetch-rates')
import fetchRates from './fetch-rates'

const currencies = ['GBP', 'EUR', 'USD']

test('return rates', async () => {
  const result = await fetchRates(currencies)

  const keys = Object.keys(result)
  const values = Object.values(result)
  expect(keys).toHaveLength(currencies.length * (currencies.length - 1))
  expect(keys.sort().join('|')).toMatchInlineSnapshot(
    `"EUR:GBP|EUR:USD|GBP:EUR|GBP:USD|USD:EUR|USD:GBP"`,
  )

  expect(values.every(isFinite)).toBe(true)
})

test('throws with less than 2 currencies', async () => {
  const empty: any = undefined
  await expect(fetchRates(empty)).rejects.toThrow('less than 2 currencies')
  await expect(fetchRates([])).rejects.toThrow('less than 2 currencies')
  await expect(fetchRates(['USD'])).rejects.toThrow('less than 2 currencies')
})

test('api coverage', async () => {
  await expect(fetchRates(['USD', 'USD'])).rejects.toThrow('[600]')
})
