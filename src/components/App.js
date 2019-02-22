import React from 'react'
import { Provider as ForexProvider } from '../hooks/forex'
import ForexDebug from './ForexDebug'

const App = () => {
  return (
    <ForexProvider>
      <h1>forex app</h1>
      <br />
      <ForexDebug />
    </ForexProvider>
  )
}

export default App
