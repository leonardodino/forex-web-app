import { format } from './dinero'

test('dinero-utils: format(JPY)', () => {
  const JPY = {
    getPrecision: jest.fn().mockReturnValue(0),
    toFormat: jest.fn().mockName('toFormat'),
  }

  format(JPY)
  expect(JPY.getPrecision).toHaveBeenCalledTimes(1)
  expect(JPY.toFormat).toHaveBeenCalledWith('0')
})

test('dinero-utils: format(USD)', () => {
  const USD = {
    getPrecision: jest.fn().mockReturnValue(2),
    toFormat: jest.fn().mockName('toFormat'),
  }
  format(USD)
  expect(USD.getPrecision).toHaveBeenCalledTimes(1)
  expect(USD.toFormat).toHaveBeenCalledWith('0.00')
})
