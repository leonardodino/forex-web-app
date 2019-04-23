import { getByTestId, queryByTestId, Matcher } from 'react-testing-library'

const getFloatValue = (str: string) => parseFloat(str.replace(/[^\d.]+/g, ''))
const $id = (container: HTMLElement) => (id: Matcher) =>
  getByTestId(container, id)

export const getPocket = (container: HTMLElement, currency: string) => {
  const card = getByTestId(container, `PocketCard-${currency}`)
  const header = getByTestId(card, 'PocketCardHeader')
  if (!header) throw new Error(`could not find ${currency} pocket in DOM`)
  const currentAmount = () => getFloatValue(String(header.textContent))
  return { card, header, currentAmount }
}

export const getPockets = (container: HTMLElement) => ({
  GBP: getPocket(container, 'GBP'),
  EUR: getPocket(container, 'EUR'),
  USD: getPocket(container, 'USD'),
})

export const getExchange = (container: HTMLElement, $ = $id(container)) => ({
  from: $('InputLine').querySelector('select'),
  to: $('OutputLine').querySelector('select'),
  flip: queryByTestId(container, 'FlipButton'),
  input: $('InputLine').querySelector('input'),
  output: $('OutputLine').querySelector('input'),
  form: $('ExchangeForm'),
  submit: $('ExchangeForm').querySelector('[type=submit]'),
})

const getElements = (container: HTMLElement, $ = $id(container)) => ({
  exchange: getExchange(container, $),
  pockets: getPockets(container),
})

export default getElements
