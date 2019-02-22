import React from 'react'
import { Provider as ForexProvider } from '../hooks/forex'
import { Provider as PocketsProvider } from '../hooks/pockets'
import ForexDebug from './ForexDebug'
import PocketsDebug from './PocketsDebug'

const App = () => {
  return (
    <PocketsProvider>
      <ForexProvider>
        <h1>forex app</h1>
        <br />
        <ForexDebug />
        <PocketsDebug />
      </ForexProvider>
    </PocketsProvider>
  )
}

export default App
