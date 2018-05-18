import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme } from '../styles'
import TelLink from './TelLink'

const contact = css`
  margin-bottom: ${theme.spacing.lg};
`

const Contact = ({ children }) => (
  <div className={contact}>
    {children}
    <p>
      <a href="mailto:vancouverIRCC@cic.gc.ca">vancouverIRCC@cic.gc.ca</a>
    </p>
    <p>
      <TelLink tel="1-888-242-2100" />
    </p>
  </div>
)
Contact.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Contact
