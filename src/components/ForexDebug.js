import React from 'react'
import { useForexState } from '../hooks/forex'

const ForexDebug = () => {
  const { rates, online, updated, error } = useForexState()
  if (error) return <pre style={{ color: 'red' }}>{error.toString()}</pre>
  return (
    <>
      <div>
        online: {(!!online).toString()}&nbsp; updated:{' '}
        {isFinite(updated) ? new Date(updated).toString() : 'N/A'}
      </div>
      <br />
      <marquee style={{ whiteSpace: 'pre' }}>
        {Object.entries(rates)
          .map(([pair, value]) => `${pair}=${value}`)
          .join('   ')}
      </marquee>
      <br />
    </>
  )
}

export default ForexDebug
