import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme } from '../styles'
import { withI18n } from 'lingui-react'
import importantMessage from '../assets/importantMessage.svg'
import { translateText } from '../utils/translation'
const imBanner = css`
  background-color: ${theme.colour.grayLight};
  color: ${theme.colour.black};
  display: inline-flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg} ${theme.spacing.xl} ${theme.spacing.lg}
    ${theme.spacing.xl};

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

const Reminder = ({ children, className = '', i18n }) => (
  <div className={`${imBanner} ${className}`}>
    <img
      src={importantMessage}
      className={icon}
      alt={translateText(i18n, 'Important Message')}
    />
    <span>{children}</span>
  </div>
)
Reminder.propTypes = {
  i18n: PropTypes.object,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default withI18n()(Reminder)
