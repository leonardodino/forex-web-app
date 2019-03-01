// prettier-ignore
export default jest.fn(() => Promise.resolve({
  'GBP:EUR': 1.1600, 'GBP:USD': 1.330,
  'EUR:GBP': 0.8636, 'EUR:USD': 1.130,
  'USD:GBP': 0.7544, 'USD:EUR': 0.885,
})).mockName('fetchRates')
