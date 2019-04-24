import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import * as utils from './react'

const shallow = (ui: React.ReactElement) => {
  const renderer = createRenderer()
  renderer.render(ui)
  return renderer.getRenderOutput()
}

// source: https://github.com/acdlite/recompose/blob/master/src/packages/recompose/__tests__/utils.getDisplayName-test.js
test('utils.getDisplayName gets the display name of a React component', () => {
  class SomeComponent extends React.Component {
    render() {
      return <div />
    }
  }

  class SomeOtherComponent extends React.Component {
    static displayName = 'CustomDisplayName'
    render() {
      return <div />
    }
  }

  function YetAnotherComponent() {
    return <div />
  }

  expect(utils.getDisplayName(undefined as any)).toBeUndefined()
  expect(utils.getDisplayName(SomeComponent)).toBe('SomeComponent')
  expect(utils.getDisplayName(SomeOtherComponent)).toBe('CustomDisplayName')
  expect(utils.getDisplayName(YetAnotherComponent)).toBe('YetAnotherComponent')
  expect(utils.getDisplayName(() => <div />)).toBe('Component')
  expect(utils.getDisplayName('div')).toBe('div')
})

// source: https://github.com/acdlite/recompose/blob/master/src/packages/recompose/__tests__/wrapDisplayName-test.js
test('wrapDisplayName wraps the display name of a React component with the name of an HoC, Relay-style', () => {
  class SomeComponent extends React.Component {
    render() {
      return <div />
    }
  }

  expect(utils.wrapDisplayName('someHoC', SomeComponent)).toBe(
    'someHoC(SomeComponent)',
  )
})

const A: React.FunctionComponent<any> = ({ children }) => <div>{children}</div>
const B: React.FunctionComponent<any> = ({ children }) => <div>{children}</div>
const C: React.FunctionComponent<any> = ({ children }) => <div>{children}</div>
const D: React.FunctionComponent<any> = ({ children }) => <div>{children}</div>

test('wrapIn nests components from outer to inner', () => {
  const Nest = utils.wrapIn(A, B, C)(D)

  expect(Nest.displayName).toBe('wrapIn(A, B, C)(D)')

  expect(shallow(<Nest pass='through'>Child</Nest>)).toMatchObject(
    <A>
      <B>
        <C>
          <D pass='through'>Child</D>
        </C>
      </B>
    </A>,
  )
})
