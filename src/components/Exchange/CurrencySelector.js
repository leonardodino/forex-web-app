import React from 'react'
import { CURRENCIES } from 'app-constants'
import Select from '../Select'

const CurrencySelector = ({ currencies = CURRENCIES, ...props }) => (
  <Select {...props}>
    {currencies.map(currency => (
      <option key={currency} value={currency} children={currency} />
    ))}
  </Select>
)

export default CurrencySelector
