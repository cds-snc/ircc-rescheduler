import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme, horizontalPadding, mediaQuery } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import PhaseBanner from './PhaseBanner'

const bigBanner = css`
  ${horizontalPadding};
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
`

const skinnyBanner = css`
  ${horizontalPadding};
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding-top: ${theme.spacing.sm};
  padding-bottom: 0.55rem;

  div {
    margin-bottom: 0;
  }
`

const pageTitle = css`
  font-size: ${theme.font.xxl};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.lg};
  `)};
`

const PageHeader = ({ children, i18n }) => (
  <div className={children ? bigBanner : skinnyBanner}>
    <PhaseBanner phase="beta">
      <Trans>This is a new service, help us improve by</Trans>{' '}
      <a
        href={i18n._(
          'https://docs.google.com/forms/d/e/1FAIpQLSdEF3D7QCZ1ecPVKdqz_-dQAvlVdwdCQtHHLzg_v2q5q7XBlg/viewform',
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Trans>sending your feedback</Trans>
      </a>
      .
    </PhaseBanner>
    {children ? <div className={pageTitle}>{children}</div> : ''}
  </div>
)
PageHeader.propTypes = {
  i18n: PropTypes.object,
  children: PropTypes.any,
}

const PageHeaderI18N = withI18n()(PageHeader)

export { PageHeaderI18N as default, PageHeader as PageHeaderBase }
