import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { mediaQuery } from '../styles'

const telStyles = css`
  > span {
    display: initial;
  }
  > a {
    display: none;
  }
  ${mediaQuery.small(css`
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

export default TelLink
