import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme } from '../styles'
import importantMessage from '../assets/importantMessage.svg'

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

const Reminder = ({ children, className = '' }) => (
  <div className={`${imBanner} ${className}`}>
    <img src={importantMessage} className={icon} alt="Important Message" />
    <span>{children}</span>
  </div>
)
Reminder.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Reminder
