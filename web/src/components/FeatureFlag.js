import React from 'react'
import PropTypes from 'prop-types'
import { FlagsProvider, Flags } from 'react-feature-flags'

const parseFlags = () => {
  let flags = []
  try {
    if (process.env.RAZZLE_FLAGS) {
      flags = JSON.parse(process.env.RAZZLE_FLAGS)
      console.log('found flags:', flags) // eslint-disable-line no-console
    }
  } catch (e) {
    // do nothing

    console.log('flags error:', e.message) // eslint-disable-line no-console
  }

  console.log('flags', process.env.RAZZLE_FLAGS) // eslint-disable-line no-console

  return flags
}

const noop = () => {
  return null
}

console.log('Feature Flag') // eslint-disable-line no-console

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
