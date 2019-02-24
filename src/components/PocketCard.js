import React from 'react'
import styled from 'styled-components'
import { base, invert } from '../utils/theme'
import { format } from '../utils/dinero'
import { useCurrencyForex } from '../hooks/forex'

const HeaderWrapper = styled.div`
  ${base}
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
`

const Header = invert(({ currency, value }) => (
  <HeaderWrapper>
    <div>{currency}</div>
    <div>{value}</div>
  </HeaderWrapper>
))

const RateWrapper = styled.div`
  ${base}
  display: flex;
  justify-content: space-between;
`

const Rate = ({ currency, rate }) => (
  <RateWrapper>
    <div>{currency}</div>
    <div>{rate}</div>
  </RateWrapper>
)

const PocketCard = ({ fund }) => {
  const [formatted, currency] = [format(fund), fund.getCurrency()]
  const { rates } = useCurrencyForex(currency)
  return (
    <div>
      <Header currency={currency} value={formatted} />
      {Object.entries(rates).map(([currency, rate]) => (
        <Rate key={currency} currency={currency} rate={rate} />
      ))}
    </div>
  )
}

export default PocketCard
