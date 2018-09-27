import React from 'react'
import PropTypes from 'prop-types'

export const contextDefault = {
  store: { language: 'en' },
  setStore: null,
}

export const contextPropTypes = {
  context: PropTypes.shape({
    store: PropTypes.object.isRequired,
    setStore: PropTypes.func,
  }),
}

export const Context = React.createContext(contextDefault)
