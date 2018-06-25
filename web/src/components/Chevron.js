import React from 'react'
import PropTypes from 'prop-types'

const Chevron = ({ width = 8, height = 8, dir = 'right' }) => {
  const flip = dir === 'right' ? '' : 'scale(-2, 2) translate(0,-1)'

  return (
    <svg
      width={height}
      height={width}
      style={{ display: 'inline-block', marginRight: '5' }}
      transform={flip}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.42 15.62"
    >
      <g>
        <path d="M6.63,7.81,1,.5H3.17L8.79,7.81,3.17,15.12H1.05Z" />
        <path d="M3.42,15.62H0L6,7.81,0,0H3.42l6,7.81Zm-1.36-1h.87L8.16,7.81,2.93,1H2L7.26,7.81Z" />
      </g>
    </svg>
  )
}

Chevron.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dir: PropTypes.string, //left or right
}

export default Chevron
