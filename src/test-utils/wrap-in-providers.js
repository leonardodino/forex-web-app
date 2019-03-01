import { wrapIn } from '../utils/react'
import { Provider as ThemeProvider, StyleProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'

const wrapInProviders = wrapIn(
  ThemeProvider,
  PocketsProvider,
  ForexProvider,
  StyleProvider,
)

export default wrapInProviders
