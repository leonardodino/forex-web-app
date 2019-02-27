import React from 'react'
import styled from 'styled-components/macro'
import { fg, base, Invert } from '../../utils/theme'
import { format } from '../../utils/dinero'
import { useCurrencyForex } from '../../hooks/forex'

const padding = `calc(1rem - 0.5px) calc(0.5rem - 1px)`

export const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 0.25rem;
  border: 1px solid ${fg};
`

const Flex = styled.div`
  ${base}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Currency = styled.h3`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  padding: ${padding};
`

const Amount = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: ${padding};
  letter-spacing: -0.025rem;
`

const ForexWrapper = styled(Flex)`
  & + & {
    box-shadow: -1px 0 0 ${fg};
  }
`

const ForexCurrency = styled.div`
  padding: ${padding};
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
`
const ForexRate = styled.div`
  padding: ${padding};
  font-size: 0.875rem;
  line-height: 1rem;
`

const Header = ({ currency, amount }) => (
  <Invert>
    <Flex>
      <Currency>{currency}</Currency>
      <Amount>{amount}</Amount>
    </Flex>
  </Invert>
)

const Forex = ({ currency, rate }) => (
  <ForexWrapper>
    <ForexCurrency>{currency}</ForexCurrency>
    <ForexRate>{rate}</ForexRate>
  </ForexWrapper>
)

const PocketCard = ({ fund }) => {
  const [formatted, currency] = [format(fund), fund.getCurrency()]
  const { rates } = useCurrencyForex(currency)
  return (
    <Wrapper>
      <Header currency={currency} amount={formatted} />
      {!!rates && (
        <Flex>
          {Object.entries(rates).map(([currency, rate]) => (
            <Forex key={currency} currency={currency} rate={rate} />
          ))}
        </Flex>
      )}
    </Wrapper>
  )
}

export default PocketCard
