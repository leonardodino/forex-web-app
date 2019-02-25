import React from 'react'
import styled from 'styled-components'
import { base, fg, focus } from '../utils/theme'
import Container from './Container'

const Wrapper = styled.button`
  ${base}
  ${focus}
  margin-bottom: 0.25rem;
  appearance: none;
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  border: solid ${fg};
  border-width: 1px 0;
  border-radius: 0;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`

const Content = styled.div`
  font-weight: 600;
`

const Return = ({ size = 20, strokeWidth = 1.75, color = 'currentColor' }) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    fill='none'
    stroke={color}
  >
    <path d='M9 10l-5 5 5 5' />
    <path d='M20 4v7a4 4 0 0 1-4 4H4' />
  </svg>
)

const Button = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Container>
      <Main>
        <Content>{children}</Content>
        <Return />
      </Main>
    </Container>
  </Wrapper>
)

export default Button
