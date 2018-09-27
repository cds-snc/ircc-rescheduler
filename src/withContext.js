import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Context } from './context'

function withContext(WrappedComponent) {
  class WithContext extends Component {
    static get displayName() {
      let wrappedComponentDisplayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      return `withContext(${wrappedComponentDisplayName})`
    }

    render() {
      return (
        <Context.Consumer>
          {context => <WrappedComponent {...this.props} context={context} />}
        </Context.Consumer>
      )
    }
  }

  // Make sure we preserve any custom statics on the original component.
  return hoistNonReactStatics(WithContext, WrappedComponent, {})
}

export default withContext
