import React, { Fragment } from 'react'
import { invert } from '../../utils/theme'
import SectionHeader from '../SectionHeader'
import ExchangeForm from './Form'

const defaultTitle = () => <SectionHeader>Forex Web App</SectionHeader>

const Exchange = ({ renderTitle = defaultTitle }) => (
  <Fragment>
    {renderTitle && renderTitle()}
    <ExchangeForm />
  </Fragment>
)

export default invert(Exchange)
