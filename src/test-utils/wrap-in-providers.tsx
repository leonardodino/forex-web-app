import { wrapIn } from '../utils/react'
import { Provider as ThemeProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import { Provider as StyleProvider } from '../components/GlobalStyle'

const wrapInProviders = wrapIn(
  ThemeProvider,
  PocketsProvider,
  ForexProvider,
  StyleProvider,
)

export default wrapInProviders
