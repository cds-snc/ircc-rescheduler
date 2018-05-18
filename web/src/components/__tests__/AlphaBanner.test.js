import React from 'react'
import { shallow } from 'enzyme'
import AlphaBanner from '../AlphaBanner'

describe('<AlphaBanner />', () => {
  it('can be instantiated', () => {
    const alphaBanner = shallow(<AlphaBanner>contact us</AlphaBanner>)
    expect(alphaBanner.find('.alphaBanner--badge').text()).toMatch(/Alpha/)
    expect(alphaBanner.find('.alphaBanner--message').text()).toMatch(
      /contact us/,
    )
  })
})
