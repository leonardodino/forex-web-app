import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

jest.mock('react-dom', () => ({ render: jest.fn() }))

let root: HTMLElement

beforeEach(() => {
  root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
})

afterEach(() => {
  document.body.removeChild(root)
})

it('renders app into div#root', () => {
  expect(ReactDOM.render).not.toHaveBeenCalled()
  require('.')
  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, root)
})
