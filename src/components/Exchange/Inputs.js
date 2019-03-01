import React from 'react'
import styled from 'styled-components/macro'
import { invert, base, borderRadius } from '../../utils/theme'
import Container from '../Container'
import CurrencySelector from './CurrencySelector'
import InputFormatter from './InputFormatter'

const Wrapper = styled.div`
  ${base}
  padding: 1.5rem 0;
  width: 100%;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`

const RelativeWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  margin-left: 1rem;
`

const Input = styled.input`
  ${base}
  display: block;
  width: 100%;
  outline: none;
  appearance: none;
  caret-color: currentColor;
  padding: 0;
  text-align: right;
  border: 0px solid transparent;
  border-radius: ${borderRadius};
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  font-family: inherit;
  text-transform: uppercase;
  text-indent: 0;
  font-variant-numeric: tabular-nums;
`

const Prefix = styled(Input)`
  background: transparent;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Transparent = styled.span`
  color: transparent;
  user-select: none;
`

const InputLine = ({ currency, setCurrency, prefix, form, ...props }) => (
  <Wrapper {...props}>
    <StyledContainer>
      <CurrencySelector value={currency} onChange={setCurrency} />
      <InputFormatter {...form}>
        {(input, ref) => (
          <RelativeWrapper>
            <Input {...form} {...input} maxLength={10} ref={ref} />
            <Prefix as='div'>
              {prefix} <Transparent>{input.value}</Transparent>
            </Prefix>
          </RelativeWrapper>
        )}
      </InputFormatter>
    </StyledContainer>
  </Wrapper>
)

InputLine.defaultProps = { prefix: '−' }

const OutputLine = invert(InputLine)
OutputLine.defaultProps = { prefix: '+' }

export { InputLine, OutputLine }

/* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
  InputLine.defaultProps['data-testid'] = 'InputLine'
  OutputLine.defaultProps['data-testid'] = 'OutputLine'
}
