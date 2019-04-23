import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { wrapDisplayName } from './react'

/* prettier-ignore */
export enum MainColors { black = 'black', white = 'white' }

const values = {
  bg: MainColors.white,
  fg: MainColors.black,
  focus: '#119dff',
  borderRadius: '0.25rem',
}
type ThemeValues = typeof values

const functions = {
  invert: ({ bg, fg, ...values }: ThemeValues) => ({
    ...functions,
    ...values,
    bg: fg,
    fg: bg,
  }),
}
type ThemeFunctions = typeof functions

const theme = { ...values, ...functions }
export type Theme = ThemeValues & ThemeFunctions
type ThemeArg = { theme: Theme }

export const Provider = (props: { children: React.ReactChild }) => (
  <ThemeProvider {...props} theme={theme} />
)

const invertProviderFn = (theme: Theme) => theme.invert(theme)

export const Invert = ({ children }: { children: React.ReactChild }) => (
  <ThemeProvider theme={invertProviderFn}>{children}</ThemeProvider>
)

export const invert = <
  P extends React.ComponentProps<T>,
  T extends React.ElementType
>(
  Component: T,
): T => {
  const Inverted = (props: P) => (
    <Invert>
      <Component {...props} />
    </Invert>
  )

  /* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
    Inverted.displayName = wrapDisplayName('invert', Component)
  }

  return Inverted as T
}

export const borderRadius = ({ theme }: ThemeArg) => theme.borderRadius
export const bg = ({ theme }: ThemeArg) => theme.bg
export const fg = ({ theme }: ThemeArg) => theme.fg
