import React from 'react'
import { usePockets } from '../hooks/pockets'
import ExchangeForm from './ExchangeForm'
import { format } from '../utils/dinero'

const PocketsDebug = () => {
  const [funds] = usePockets()
  return (
    <>
      <br />
      <pre>
        {Object.entries(funds)
          .map(([pair, dinero]) => `${pair}: ${format(dinero)}`)
          .join('\n')}
      </pre>
      <br />
      <ExchangeForm />
    </>
  )
}

export default PocketsDebug
