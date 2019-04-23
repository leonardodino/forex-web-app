import React from 'react'
import styled from 'styled-components/macro'
import { base } from '../utils/style'
import Container from './Container'

const Wrapper = styled.header`
  ${base}
`

type Props = { paddingBottom?: string | number }
type Component = React.FunctionComponent<Props>

const getPaddingBottom = ({ paddingBottom = '' }: Props) => paddingBottom

const Title = styled.h1<Props>`
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  text-transform: lowercase;
  padding: 1rem 0 ${getPaddingBottom};
`

const SectionHeader: Component = ({ children, paddingBottom, ...props }) => (
  <Wrapper {...props}>
    <Container>
      <Title paddingBottom={paddingBottom}>{children}</Title>
    </Container>
  </Wrapper>
)

export default SectionHeader
