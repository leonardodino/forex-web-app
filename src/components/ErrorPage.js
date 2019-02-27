import React from 'react'
import styled from 'styled-components/macro'
import { base, invert } from '../utils/theme'

const Wrapper = styled.div`
  ${base}
  font-feature-settings: 'kern', 'liga', 'pnum', 'lnum', 'zero';
  font-size: 33vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const ErrorPage = ({ children = 404 }) => <Wrapper>{children}</Wrapper>

export default invert(ErrorPage)
