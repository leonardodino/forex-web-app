import React, { forwardRef, Fragment } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro'
import { wrapDisplayName } from './react'

const theme = {
  bg: 'white',
  fg: 'black',
  focus: '#119dff',
  borderRadius: '0.25rem',
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

  if (process.env.NODE_ENV !== 'production') {
    Inverted.displayName = wrapDisplayName('invert', Component)
  }

  Inverted[wrapped] = Component
  return Inverted
}

const rgbTuple = c => ({ black: '0,0,0', white: '255,255,255' }[c])

export const borderRadius = ({ theme }) => theme.borderRadius
export const bg = ({ theme }) => theme.bg
export const fg = ({ theme }) => theme.fg
export const base = ({ theme }) => `
  --bg-rgb: ${rgbTuple(bg({ theme }))};
  --fg-rgb: ${rgbTuple(fg({ theme }))};
  background: ${bg({ theme })};
  color: ${fg({ theme })};
`

const GlobalStyle = createGlobalStyle`
  :root, body { ${base} height: 100%; }
  :root { background: ${fg}; }
`

export const StyleProvider = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    {children}
  </Fragment>
)

const getFocusSelector = ({ element, within }) =>
  `${element}:${within ? 'focus-within' : 'focus'}`

const getFocusCss = selector => ({ theme }) => `
  outline: none !important;
  ::-moz-focus-inner { border: 0 }
  ${selector} { box-shadow: 0 0 0 3px ${theme.focus} }
`

export const focus = ({
  theme,
  element = '&',
  within = false,
  selector = getFocusSelector({ element, within }),
}) => {
  const getter = getFocusCss(selector)
  return theme ? getter({ theme }) : getter
}
