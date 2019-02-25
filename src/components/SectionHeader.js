import React from 'react'
import styled from 'styled-components'
import { base } from '../utils/theme'
import Container from './Container'

const Wrapper = styled.header`
  ${base}
`

const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  text-transform: lowercase;
  padding: 1rem 0;
`

const SectionHeader = ({ children }) => (
  <Wrapper>
    <Container>
      <Title>{children}</Title>
    </Container>
  </Wrapper>
)

export default SectionHeader
