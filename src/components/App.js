import React, { Fragment } from 'react'
import { wrapIn } from '../utils/react'
import { Provider as ThemeProvider, StyleProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import Exchange from './Exchange'
import Pockets from './Pockets'

const enhance = wrapIn(
  ThemeProvider,
  PocketsProvider,
  ForexProvider,
  StyleProvider,
)

const App = () => {
  return (
    <Fragment>
      <Exchange />
      <Pockets />
    </Fragment>
  )
}

export default enhance(App)
