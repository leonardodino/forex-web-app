import { format } from './InputFormatter'

test('format: empty', () => {
  expect(format('')).toBe('0.00')
  expect(format('0')).toBe('0.00')
  expect(format('0.0')).toBe('0.00')
})

test('format: filled', () => {
  expect(format('10000')).toBe('100.00')
})
