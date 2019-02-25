import React from 'react'
import { Provider as ThemeProvider, BaseStyle } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import Exchange from './Exchange'
import Pockets from './Pockets'

const App = () => {
  return (
    <ThemeProvider>
      <PocketsProvider>
        <ForexProvider>
          <BaseStyle />
          <Exchange />
          <Pockets />
        </ForexProvider>
      </PocketsProvider>
    </ThemeProvider>
  )
}

export default App
