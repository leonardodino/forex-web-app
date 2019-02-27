import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CURRENCIES } from '../constants'
import Exchange from './Exchange'
import Pockets from './Pockets'
import ErrorPage from './ErrorPage'

const currencyRegex = CURRENCIES.join('|')
const exchangePath = `/exchange/:from(${currencyRegex})x:to(${currencyRegex})`
const renderExchange = ({ match: { params }, history }) => {
  const actions = {
    setFrom: event => {
      const from = event && event.target ? event.target.value : event
      const to = from === params.to ? params.from : params.to
      history.replace(`/exchange/${from}x${to}`)
    },
    setTo: event => {
      const to = event && event.target ? event.target.value : event
      const from = to === params.from ? params.to : params.from
      history.replace(`/exchange/${from}x${to}`)
    },
  }
  return (
    <Fragment>
      <Exchange {...params} {...actions} />
      <Pockets />
    </Fragment>
  )
}

const Routes = () => (
  <Switch>
    <Route sensitive exact strict path={exchangePath} render={renderExchange} />
    <Redirect exact from='/' to='/exchange/GBPxEUR' />
    <Route render={() => <ErrorPage />} />
  </Switch>
)

export default Routes
