import { createElement, createFactory } from 'react'

export const getDisplayName = Component => {
  if (typeof Component === 'string') return Component
  if (!Component) return undefined
  return Component.displayName || Component.name || 'Component'
}

export const wrapDisplayName = (fnName, Component) =>
  `${fnName}(${getDisplayName(Component)})`

export const wrapIn = (...Providers) => {
  const factories = Providers.map(provider => createFactory(provider))
  return Component => {
    const WrapIn = ({ children, ...props }) =>
      factories.reduceRight(
        (child, factory) => factory(null, child),
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
