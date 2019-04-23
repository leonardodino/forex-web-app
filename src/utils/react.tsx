import { createElement, createFactory } from 'react'

type Component<T = {}> = React.ElementType<T> | string

export const getDisplayName = (Component: Component) => {
  if (typeof Component === 'string') return Component
  if (!Component) return undefined
  return Component.displayName || Component.name || 'Component'
}

export const wrapDisplayName = (fnName: string, Component: Component) =>
  `${fnName}(${getDisplayName(Component)})`

type AnyComponent<T = any> = React.ComponentType<T>

export const wrapIn = (...Providers: AnyComponent[]) => {
  const factories = Providers.map(provider => createFactory(provider as any))
  return (Component: AnyComponent): AnyComponent => {
    const WrapIn: React.FunctionComponent = ({ children, ...props }) =>
      factories.reduceRight(
        (child, factory) => factory(undefined, child),
        createElement(Component, props, children),
      )

    /* istanbul ignore else */ if (process.env.NODE_ENV !== 'production') {
      const providerNames = Providers.map(getDisplayName).join(', ')
      const displayName = getDisplayName(Component)
      WrapIn.displayName = `wrapIn(${providerNames})(${displayName})`
    }

    return WrapIn
  }
}
