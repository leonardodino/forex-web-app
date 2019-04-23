import { fg, bg, MainColors, Theme } from './theme'

const toRGB = (c: MainColors) => ({ black: '0,0,0', white: '255,255,255' }[c])

type StyleFn<T = Record<string, any>> = (props: T & { theme: Theme }) => string
type StyleFnCurry<T> = (props: T & { theme?: Theme }) => string | StyleFn<T>

const getFocusSelector = (element: string, within: boolean) =>
  `${element}:${within ? 'focus-within' : 'focus'}`

const getFocusCss = (selector: string): StyleFn => ({ theme }) => `
  outline: none !important;
  ::-moz-focus-inner { border: 0 }
  ${selector} { box-shadow: 0 0 0 3px ${theme.focus} }
`

export const focus: StyleFnCurry<{
  element?: string
  within?: boolean
  selector?: string
}> = ({
  theme,
  element = '&',
  within = false,
  selector = getFocusSelector(element, within),
}) => {
  const getter = getFocusCss(selector)
  return theme ? getter({ theme }) : getter
}

export const base: StyleFn = ({ theme }) => `
  --bg-rgb: ${toRGB(bg({ theme }))};
  --fg-rgb: ${toRGB(fg({ theme }))};
  background: ${bg({ theme })};
  color: ${fg({ theme })};
`
