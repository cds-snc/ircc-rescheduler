import { shallow } from 'enzyme'
import AlphaBanner from '../FederalBanner'
import React from 'react'

describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = shallow(<federalBanner />)
    expect(federalBanner.find('svg')).toBeTruthy()
  })
})
