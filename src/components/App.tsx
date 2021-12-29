import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { wrapIn } from '../utils/react'
import { Provider as ThemeProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import { Provider as StyleProvider } from './GlobalStyle'
import NavBar from './NavBar'
import Routes from './Routes'
import Footer from './Footer'
import { BASENAME } from '../constants'

const CustomRouter: React.FC = ({ children }) => (
  <BrowserRouter basename={BASENAME}>{children}</BrowserRouter>
)

const enhance = wrapIn(
  ThemeProvider,
  PocketsProvider,
  ForexProvider,
  StyleProvider,
  CustomRouter,
)

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Routes />
      <Footer />
    </Fragment>
  )
}

export default enhance(App)
export { App as BareApp }
