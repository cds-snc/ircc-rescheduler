import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { Trans } from 'lingui-react'
import PhaseBanner from './PhaseBanner'

const bigBanner = css`
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl};

  ${mediaQuery.sm(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};

  > * {
    font-size: ${theme.font.xxl};
    font-weight: 700;

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
    `)};
  }
`

const skinnyBanner = css`
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding: ${theme.spacing.sm} ${theme.spacing.xxxl} 0.55rem
    ${theme.spacing.xxxl};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.sm} ${theme.spacing.xl} 0.55rem ${theme.spacing.xl};
  `)};

  div {
    margin-bottom: 0;
  }
`

const PageHeader = ({ children, headerClass = '' }) => (
  <header className={headerClass ? skinnyBanner : bigBanner}>
    <PhaseBanner phase="beta" color={`${theme.colour.white}`}>
      <Trans>
        This is a new service, help us improve by{' '}
        <a
          className="bannerLink"
          href="https://docs.google.com/forms/d/1a1bJDF4BmepyMJaYubOSg3IiW4kjCqFrAu_0QXLYQ8Q/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          sending your feedback
        </a>
      </Trans>
    </PhaseBanner>
    <div className={headerClass}>{children}</div>
  </header>
)
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  headerClass: PropTypes.string,
}

export default PageHeader
