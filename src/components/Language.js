import React from 'react'
import PropTypes from 'prop-types'
import withContext from '../withContext'
import { contextPropTypes } from '../context'

class Language extends React.Component {
  render() {
    let { context: { store: { language = 'en' } = {} } = {} } = this.props
    return <React.Fragment>{this.props.render(language)}</React.Fragment>
  }
}
Language.propTypes = {
  ...contextPropTypes,
  render: PropTypes.func.isRequired,
}

export default withContext(Language)
