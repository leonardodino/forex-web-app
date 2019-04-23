import React, { Fragment } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { CURRENCIES } from '../constants'
import Exchange from './Exchange'
import Pockets from './Pockets'
import ErrorPage from './ErrorPage'

const currencyRegex = CURRENCIES.join('|')
const exchangePath = `/exchange/:from(${currencyRegex})x:to(${currencyRegex})`

type ExchangeRouteProps = RouteComponentProps<{ from: string; to: string }>
type EventOrString = React.ChangeEvent<HTMLSelectElement> | string
const get = (e: EventOrString) => (typeof e === 'string' ? e : e.target.value)

const renderExchange = ({ match: { params }, history }: ExchangeRouteProps) => {
  const actions = {
    setFrom: (e: EventOrString) => {
      const to = get(e) === params.to ? params.from : params.to
      history.replace(`/exchange/${get(e)}x${to}`)
    },
    setTo: (e: EventOrString) => {
      const from = get(e) === params.from ? params.to : params.from
      history.replace(`/exchange/${from}x${get(e)}`)
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
