import React, { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components/macro'
import { fg } from '../utils/theme'
import { base } from '../utils/style'

const GlobalStyle = createGlobalStyle`
  :root, body, #root { ${base} height: 100%; }
  :root, body { background: ${fg}; }
`

export const Provider: React.FunctionComponent = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    {children}
  </Fragment>
)
