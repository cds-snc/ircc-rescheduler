import React from 'react'
import PropTypes from 'prop-types'
import { FlagsProvider, Flags } from 'react-feature-flags'

const parseFlags = () => {
  let flags = []
  try {
    if (process.env.RAZZLE_FLAGS) {
      flags = JSON.parse(process.env.RAZZLE_FLAGS)
    }
  } catch (e) {
    // do nothing
  }

  return flags
}

const noop = () => {
  return null
}

export const FeatureFlag = ({ on = noop, off = noop, flags = [] }) => {
  return (
    <FlagsProvider value={parseFlags()}>
      <Flags authorizedFlags={flags} renderOn={on} renderOff={off} />
    </FlagsProvider>
  )
}

FeatureFlag.propTypes = {
  on: PropTypes.func,
  off: PropTypes.func,
  flags: PropTypes.array,
}
