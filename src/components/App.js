import React from 'react'
import { Provider as ThemeProvider } from '../utils/theme'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import ForexDebug from './ForexDebug'
import PocketsDebug from './PocketsDebug'

const App = () => {
  return (
    <ThemeProvider>
      <PocketsProvider>
        <ForexProvider>
          <h1>forex app</h1>
          <br />
          <ForexDebug />
          <PocketsDebug />
        </ForexProvider>
      </PocketsProvider>
    </ThemeProvider>
  )
}

export default App
