import React from 'react'
import PropTypes from 'prop-types'
import { theme } from '../styles'

const MobileCancel = ({
  index,
  circleColour = theme.colour.blackLight,
  label = '',
}) => {
  let titleId = `titleId-${index}`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 21.62 21.62"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{label}</title>
      <g data-name="Layer 2">
        <g data-name="Layer 1-2">
          <circle cx="10.81" cy="10.81" r="10.81" fill={circleColour} />
          <path
            fill="#fff"
            d="M11.93 10.82l3.56-3.56a.79.79 0 0 0 0-1.11.8.8 0 0 0-1.12 0L10.82 9.7 7.26 6.15a.8.8 0 0 0-1.12 0 .79.79 0 0 0 0 1.11l3.55 3.55-3.55 3.55a.79.79 0 0 0 .55 1.34.8.8 0 0 0 .56-.23l3.55-3.54 3.55 3.55a.79.79 0 0 0 .56.23.77.77 0 0 0 .54-1.33z"
          />
        </g>
      </g>
    </svg>
  )
}

MobileCancel.propTypes = {
  index: PropTypes.number.isRequired,
  circleColour: PropTypes.string,
  label: PropTypes.string,
}

export default MobileCancel
