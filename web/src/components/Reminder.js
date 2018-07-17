import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import importantMessage from '../assets/importantMessage.svg'
import { withI18n } from 'lingui-react'

const imBanner = css`
  font-family: ${theme.weight.b}, Helvetica, Arial, sans-serif;
  font-weight: 700;
  color: ${theme.colour.black};
  display: inline-flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg} 0;

  ${mediaQuery.md(css`
    padding: ${theme.spacing.xs} 0 0 0;
  `)};

  span {
    font-size: ${theme.font.md};
    display: block;
  }
`
const icon = css`
  width: 3rem;
  height: 3rem;
  display: block;
  margin-right: ${theme.spacing.lg};
`

const Reminder = withI18n()(({ children, i18n, className = '' }) => (
  <div className={`${imBanner} ${className}`}>
    <img
      src={importantMessage}
      className={icon}
      alt={i18n._('Important message')}
    />
    <span>{children}</span>
  </div>
))
Reminder.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export const LongReminder = styled(Reminder)`
  padding: 0;
  margin-bottom: ${theme.spacing.xl} !important;

  ${mediaQuery.md(css`
    display: block;
  `)};

  img {
    ${mediaQuery.md(css`
      float: left;
      margin-top: ${theme.spacing.xs};
      margin-right: ${theme.spacing.md};
    `)};
  }
`

export default Reminder
