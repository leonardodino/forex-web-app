import { getByTestId, queryByTestId } from 'react-testing-library'

const getFloatValue = string => parseFloat(string.replace(/[^\d.]+/g, ''))
const $id = container => id => getByTestId(container, id)

export const getPocket = (container, currency) => {
  const card = getByTestId(container, `PocketCard-${currency}`)
  const header = getByTestId(card, 'PocketCardHeader')
  const currentAmount = () => getFloatValue(header.textContent)
  return { card, header, currentAmount }
}

export const getPockets = container => ({
  GBP: getPocket(container, 'GBP'),
  EUR: getPocket(container, 'EUR'),
  USD: getPocket(container, 'USD'),
})

export const getExchange = (container, $ = $id(container)) => ({
  from: $('InputLine').querySelector('select'),
  to: $('OutputLine').querySelector('select'),
  flip: queryByTestId(container, 'FlipButton'),
  input: $('InputLine').querySelector('input'),
  output: $('OutputLine').querySelector('input'),
  form: $('ExchangeForm'),
  submit: $('ExchangeForm').querySelector('[type=submit]'),
})

const getElements = (container, $ = id => getByTestId(container, id)) => ({
  exchange: getExchange(container),
  pockets: getPockets(container),
})

export default getElements
