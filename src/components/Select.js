import React from 'react'
import styled from 'styled-components/macro'
import { borderRadius } from '../utils/theme'
import { base, focus } from '../utils/style'

const Wrapper = styled.label`
  ${base}
  ${focus({ within: true })}
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  line-height: 1.5rem;
  border-radius: ${borderRadius};
  padding: 0 0.5rem;
  margin-left: -0.5rem;
  flex: 0 0 auto;
`

const Field = styled.select`
  border-radius: 0;
  font-size: 1rem;
  display: block;
  appearance: none;
  border: none;
  opacity: 0;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Value = styled.div`
  font-weight: 600;
  margin: 0.5rem 0.5rem 0.5rem 0;
`

const ChevronSVG = styled.svg`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  fill: none;
  flex: 0 0 auto;
`

const Chevron = ({ size = 16, strokeWidth = 1.5, color = 'currentColor' }) => (
  <ChevronSVG viewBox='0 0 16 16' size={size}>
    <path stroke={color} strokeWidth={strokeWidth} d='M4 6l4 4 4-4' />
  </ChevronSVG>
)

const Select = ({ style, className, ...props }) => (
  <Wrapper style={style} className={className}>
    <Value>{props.value}</Value>
    <Field {...props} />
    <Chevron />
  </Wrapper>
)

export default Select
