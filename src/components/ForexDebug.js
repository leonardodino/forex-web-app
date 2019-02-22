import React from 'react'
import { useForexState } from '../hooks/forex'

const ForexDebug = () => {
  const { rates, online, updated, error } = useForexState()
  if (error) return <pre style={{ color: 'red' }}>{error.toString()}</pre>
  return (
    <>
      <pre>online: {(!!online).toString()}</pre>
      <pre>updated: {updated ? new Date(updated).toString() : 'N/A'}</pre>
      <br />
      <pre>
        {Object.entries(rates)
          .map(([pair, value]) => `${pair}: ${value}`)
          .join('\n')}
      </pre>
    </>
  )
}

export default ForexDebug
