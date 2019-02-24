import React, { forwardRef } from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  bg: 'white',
  fg: 'black',
  invert: ({ bg, fg, ...rest }) => ({ bg: fg, fg: bg, ...rest }),
}

export const Provider = props => <ThemeProvider {...props} theme={theme} />

export const Invert = ({ children, invert = true }) => {
  if (!invert) return children
  return (
    <ThemeProvider theme={theme => theme.invert(theme)}>
      {children}
    </ThemeProvider>
  )
}

export const invert = Component => {
  const Inverted = forwardRef((props, ref) => (
    <Invert>
      <Component {...props} ref={ref} />
    </Invert>
  ))
  return Inverted
}

export const bg = ({ theme }) => theme.bg
export const fg = ({ theme }) => theme.fg
export const base = ({ theme }) => `
  background: ${bg({ theme })};
  color: ${fg({ theme })};
`
