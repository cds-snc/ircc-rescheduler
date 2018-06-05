import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import importantMessage from '../assets/importantMessage.svg'

const imBanner = css`
  background-color: ${theme.colour.grayLight};
  color: ${theme.colour.black};
  display: inline-flex;
  align-items: center;
  margin-top: 0rem;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg} ${theme.spacing.xl} ${theme.spacing.lg}
    ${theme.spacing.xl};

  ${mediaQuery.md(css`
    display: block;
  `)};

  span {
    font-size: ${theme.font.md};
    display: block;
  }
`
const icon = css`
  width: 3.2rem;
  height: 3.2rem;
  display: block;
  margin-right: ${theme.spacing.lg};

  ${mediaQuery.md(css`
    float: left;
  `)};
`

const Reminder = ({ children }) => (
  <div className={imBanner}>
    <img src={importantMessage} className={icon} alt="Important Message" />
    <span>{children}</span>
  </div>
)
Reminder.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Reminder
