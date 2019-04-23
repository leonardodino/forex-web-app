import { useState, useEffect, useCallback } from 'react'

const getOnlineStatus = () => {
  return !(typeof navigator !== 'undefined' && navigator.onLine === false)
}

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus)
  const goOnline = useCallback(() => setOnlineStatus(true), [setOnlineStatus])
  const goOffline = useCallback(() => setOnlineStatus(false), [setOnlineStatus])

  useEffect(() => {
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [goOnline, goOffline])

  return onlineStatus
}

export default useOnlineStatus
