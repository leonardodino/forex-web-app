import React, { Fragment } from 'react'
import { usePockets } from '../../hooks/pockets'
import Container from '../Container'
import SectionHeader from '../SectionHeader'
import PocketCard from './Card'

const defaultTitle = () => <SectionHeader>Pockets</SectionHeader>

const Pockets = ({ renderTitle = defaultTitle }) => {
  const [funds] = usePockets()
  return (
    <Fragment>
      {renderTitle && renderTitle()}
      <Container>
        {Object.entries(funds).map(([currency, fund]) => (
          <PocketCard key={currency} fund={fund} />
        ))}
      </Container>
    </Fragment>
  )
}

export default Pockets
