import React from 'react'
import styled from 'styled-components'
import { base } from '../utils/theme'

const Wrapper = styled.label`
  ${base}
  display: flex;
  align-items: center;
  position: relative;
  line-height: 1.5rem;
  padding-right: 0.5rem;
`

const Field = styled.select`
  background: transparent;
  border-radius: 0;
  font-size: 1rem;
  display: block;
  appearance: none;
  border: none;
  color: transparent;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Value = styled.div`
  font-weight: 600;
  margin: 0.5rem 0.5rem 0.5rem 0;
`

const Chevron = ({ size = 16, strokeWidth = 1.5, color = 'currentColor' }) => (
  <svg viewBox='0 0 16 16' width={size} height={size} fill='none'>
    <path stroke={color} strokeWidth={strokeWidth} d='M4 6l4 4 4-4' />
  </svg>
)

const Select = ({ style, className, ...props }) => (
  <Wrapper style={style} className={className}>
    <Value>{props.value}</Value>
    <Field {...props} />
    <Chevron />
  </Wrapper>
)

export default Select
