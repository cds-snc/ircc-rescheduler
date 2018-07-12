import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme, mediaQuery } from '../styles'

const telStyles = css`
  > span {
    display: initial;
  }
  > a {
    display: none;
  }
  ${mediaQuery.sm(css`
    > span {
      display: none;
    }
    > a {
      display: initial;
    }
  `)};
`

const TelLink = ({ tel }) => (
  <span className={telStyles}>
    <span>{tel}</span>
    <a href={`tel:+${tel}`} rel="nofollow">
      {tel}
    </a>
  </span>
)
TelLink.propTypes = {
  tel: PropTypes.string.isRequired,
}

const contact = css`
  margin-bottom: ${theme.spacing.lg};
`

const Contact = ({ children, phoneFirst = false }) => (
  <div className={contact}>
    {children}
    {!phoneFirst ? (
      <React.Fragment>
        <p>
          <a href="mailto:IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca">
            IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca
          </a>
        </p>
        <p>
          <TelLink tel="1-888-242-2100" />
        </p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <p>
          <TelLink tel="1-888-242-2100" />
        </p>
        <p>
          <a href="mailto:IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca">
            IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca
          </a>
        </p>
      </React.Fragment>
    )}
  </div>
)
Contact.propTypes = {
  children: PropTypes.element.isRequired,
  phoneFirst: PropTypes.bool,
}

export { Contact as default, TelLink }
