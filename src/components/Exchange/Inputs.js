import React from 'react'
import styled from 'styled-components/macro'
import { invert, base } from '../../utils/theme'
import Container from '../Container'
import CurrencySelector from './CurrencySelector'

const Wrapper = styled.div`
  ${base}
  padding: 1.5rem 0;
  width: 100%;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  ${base}
  outline: none;
  appearance: none;
  caret-color: currentColor;
  padding: 0;
  text-align: right;
  border: 0px solid transparent;
  border-radius: 0.25rem;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  min-width: 10rem;
  flex: 0 1 autos;
`

export const InputLine = ({ currency, setCurrency, form }) => (
  <Wrapper>
    <StyledContainer>
      <CurrencySelector value={currency} onChange={setCurrency} />
      <Input {...form} pattern='\d{1,}(\.\d{2})?' />
    </StyledContainer>
  </Wrapper>
)

export const OutputLine = invert(InputLine)
