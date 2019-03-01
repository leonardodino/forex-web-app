import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import useOnlineStatus from '@rehooks/online-status'
import { invert, fg, borderRadius } from 'utils/theme'
import { useForexState } from 'hooks/forex'
import SectionHeader from './SectionHeader'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Badge = styled.div`
  border: 1px solid ${fg};
  border-radius: ${borderRadius};
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding: calc(0.125rem - 1px) calc(0.25rem + 3px);
  flex: 0 0 auto;
`

const $root = document.querySelector('#root')

const NavBar = () => {
  const browserOnline = useOnlineStatus()
  const { online: forexOnline } = useForexState()
  const online = browserOnline && forexOnline
  useEffect(() => {
    /* istanbul ignore if */
    if ($root) return $root.classList[online ? 'remove' : 'add']('offline')
  }, [online])
  return (
    <SectionHeader paddingBottom={0}>
      <Flex>
        <div>Forex Web App</div>
        {!online && <Badge>{browserOnline ? 'loading...' : 'offline'}</Badge>}
      </Flex>
    </SectionHeader>
  )
}

export default invert(NavBar)
