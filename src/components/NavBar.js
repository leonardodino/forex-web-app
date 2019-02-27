import React from 'react'
import { invert } from '../utils/theme'
import SectionHeader from './SectionHeader'

const NavBar = () => (
  <SectionHeader paddingBottom={0}>Forex Web App</SectionHeader>
)

export default invert(NavBar)
