import React from 'react'
import styled from 'styled-components'
import { invert, base } from '../utils/theme'
import Container from './Container'
import CurrencySelector from './CurrencySelector'
import Input from './Input'

const Wrapper = styled.div`
  ${base}
  padding: 1.5rem 0;
  width: 100%;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`

export const InputLine = invert(({ currency, setCurrency, exclude, form }) => (
  <Wrapper>
    <StyledContainer>
      <CurrencySelector
        value={currency}
        onChange={setCurrency}
        exclude={exclude}
      />
      <Input {...form} pattern='\d{1,}(\.\d{2})?' />
    </StyledContainer>
  </Wrapper>
))

export const OutputLine = invert(InputLine)
