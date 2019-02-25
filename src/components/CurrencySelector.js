import React from 'react'
import { CURRENCIES as C } from '../constants'
import Select from './Select'

const CurrencySelector = ({ currencies = C, exclude = [], ...props }) => (
  <Select {...props}>
    {currencies.map(v => {
      if (exclude.includes(v)) return null
      return (
        <option key={v} value={v}>
          {v}
        </option>
      )
    })}
  </Select>
)

export default CurrencySelector
