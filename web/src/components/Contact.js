import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme, mediaQuery } from '../styles'
import { Trans } from 'lingui-react'

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
    <a id="telephone" href={`tel:+${tel}`} rel="nofollow">
      {tel}
    </a>
  </span>
)
TelLink.propTypes = {
  tel: PropTypes.string.isRequired,
}

const contact = css`
  margin-bottom: ${theme.spacing.lg};
  p:first-of-type {
    margin-bottom: ${theme.spacing.sm};
  }
  wbr {
    display: none;
  }

  ${mediaQuery.xs(css`
    a[id='email'],
    a[id='telephone'] {
      display: block;
    }
    wbr {
      display: inline;
    }
  `)};
`

const Contact = ({ children, phoneFirst = false }) => (
  <div className={contact}>
    {children}
    {!phoneFirst ? (
      <React.Fragment>
        <p>
          <strong>
            <Trans>Email —</Trans>
          </strong>{' '}
          <a
            id="email"
            href="mailto:IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca"
          >
            IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC
            <wbr />
            @cic.gc.ca
          </a>
        </p>
        <p>
          <strong>
            <Trans>Phone —</Trans>
          </strong>{' '}
          <TelLink tel="1-888-242-2100" />
        </p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <p>
          <strong>
            <Trans>Phone —</Trans>
          </strong>{' '}
          <TelLink tel="1-888-242-2100" />
        </p>
        <p>
          <strong>
            <Trans>Email —</Trans>
          </strong>{' '}
          <a
            idea="email"
            href="mailto:IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC@cic.gc.ca"
          >
            IRCC.DNCitVANNotification-NotificationVANCitRN.IRCC
            <wbr />
            @cic.gc.ca
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
