import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { wrapIn } from '../utils/react'
import { Provider as ThemeProvider, StyleProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import NavBar from './NavBar'
import Routes from './Routes'
import Footer from './Footer'

const enhance = wrapIn(
  ThemeProvider,
  PocketsProvider,
  ForexProvider,
  StyleProvider,
  BrowserRouter,
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
