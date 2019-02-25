import React, { Fragment } from 'react'
import { Invert } from '../utils/theme'
import SectionHeader from './SectionHeader'
import ExchangeForm from './ExchangeForm'

const defaultTitle = () => (
  <Invert>
    <SectionHeader>Forex Web App</SectionHeader>
  </Invert>
)

const Exchange = ({ renderTitle = defaultTitle }) => (
  <Fragment>
    {renderTitle && renderTitle()}
    <ExchangeForm />
  </Fragment>
)

export default Exchange
