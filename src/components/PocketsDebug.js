import React from 'react'
import { usePockets } from '../hooks/pockets'
import ExchangeForm from './ExchangeForm'
import PocketCard from './PocketCard'

const PocketsDebug = () => {
  const [funds] = usePockets()
  return (
    <>
      <br />
      {Object.entries(funds).map(([currency, fund]) => (
        <PocketCard key={currency} fund={fund} />
      ))}
      <br />
      <ExchangeForm />
    </>
  )
}

export default PocketsDebug
