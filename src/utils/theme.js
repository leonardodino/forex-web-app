import React, { forwardRef } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

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

// optimize chained calls, returns original component
const wrapped = Symbol('wrapped')
export const invert = Component => {
  if (Component[wrapped]) return Component[wrapped]
  const Inverted = forwardRef((props, ref) => (
    <Invert>
      <Component {...props} ref={ref} />
    </Invert>
  ))
  Inverted[wrapped] = Component
  return Inverted
}

const rgbTuple = c => ({ black: '0,0,0', white: '255,255,255' }[c])

export const bg = ({ theme }) => theme.bg
export const fg = ({ theme }) => theme.fg
export const base = ({ theme }) => `
  --bg-rgb: ${rgbTuple(bg({ theme }))};
  --fg-rgb: ${rgbTuple(fg({ theme }))};
  background: ${bg({ theme })};
  color: ${fg({ theme })};
`

export const BaseStyle = createGlobalStyle`:root{ ${base} }`
