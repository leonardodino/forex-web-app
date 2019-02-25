import React from 'react'
import { CURRENCIES as C } from '../../constants'
import Select from '../Select'

const CurrencySelector = ({ currencies = C, exclude = [], ...props }) => (
  <Select {...props}>
    {currencies.map(currency => {
      if (exclude.includes(currency)) return null
      return (
        <option key={currency} value={currency}>
          {currency}
        </option>
      )
    })}
  </Select>
)

export default CurrencySelector
