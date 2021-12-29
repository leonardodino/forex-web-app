import React from 'react'
import { Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import { createMemoryHistory } from 'history'

// from: https://github.com/kentcdodds/react-testing-library/blob/a06a6ecb43/examples/__tests__/react-router.js#L36-L47
export const renderWithRouter = (
  ui: React.ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
})
