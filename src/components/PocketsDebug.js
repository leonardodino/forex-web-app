import React from 'react'
import { usePockets } from '../hooks/pockets'
import ExchangeForm from './ExchangeForm'

const PocketsDebug = () => {
  const [funds] = usePockets()
  return (
    <>
      <br />
      <pre>
        {Object.entries(funds)
          .map(([pair, value]) => `${pair}: ${value}`)
          .join('\n')}
      </pre>
      <br />
      <ExchangeForm />
    </>
  )
}

export default PocketsDebug
