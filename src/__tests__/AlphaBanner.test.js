import { shallow } from 'enzyme'
import AlphaBanner from '../AlphaBanner'
import React from 'react'

describe('AlphaBanner', () => {
  it('can be instantiated', () => {
    const alphaBanner = shallow(<AlphaBanner />)
    expect(alphaBanner.find('p').text()).toMatch(/Alpha/)
  })
})
