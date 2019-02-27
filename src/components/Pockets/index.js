import React from 'react'
import styled from 'styled-components/macro'
import { base } from '../../utils/theme'
import { usePockets } from '../../hooks/pockets'
import Container from '../Container'
import SectionHeader from '../SectionHeader'
import PocketCard, { Wrapper as CardWrapper } from './Card'

const defaultTitle = () => <SectionHeader>Pockets</SectionHeader>

const Wrapper = styled.div`
  ${base}
  padding-top: 2rem;
`

const Row = styled.div`
  margin: 0 -1rem;
  overflow: scroll;
  display: flex;
  flex-wrap: no-wrap;
  /* prettier-ignore */
  &::before, &::after { content: ''; flex: 0 0 0.25rem; }
  /* [HACK]: scrollbar hacking, ideally would use a wrapper to hide it */
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scrollbar-height: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  /* [TODO]: add expand/collapse button to SectionHeader */
  & > ${CardWrapper} {
    margin: 0.5rem 0.75rem;
    min-width: 13rem;
    flex: 0 0 auto;
  }
`

const Pockets = ({ renderTitle = defaultTitle }) => {
  const [funds] = usePockets()
  return (
    <Wrapper>
      {renderTitle && renderTitle()}
      <Container>
        <Row>
          {Object.entries(funds).map(([currency, fund]) => (
            <PocketCard key={currency} fund={fund} />
          ))}
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Pockets
