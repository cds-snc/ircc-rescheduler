import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import importantMessage from './importantMessage.svg'

const imBanner = css`
  background-color: ${theme.colour.grayLight};
  color: ${theme.colour.black};
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg} ${theme.spacing.xl} ${theme.spacing.lg}
    ${theme.spacing.xl};
  width: 80%;

  ${mediaQuery.lg(css`
    width: 100%;
  `)};

  ${mediaQuery.md(css`
    flex-direction: column;
  `)};

  span {
    font-size: ${theme.font.md};
    display: block;

    ${mediaQuery.md(css`
      text-align: center;
    `)};
  }
`
const icon = css`
  width: 3rem;
  height: 3rem;
  display: block;
  margin-right: ${theme.spacing.lg};

  ${mediaQuery.md(css`
    margin-bottom: ${theme.spacing.md};
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
