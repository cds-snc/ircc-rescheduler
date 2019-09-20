import React from 'react'
import { shallow } from 'enzyme'
import FederalBanner from '../FederalBanner'

describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = shallow(<FederalBanner />)
    expect(federalBanner.find('.svg-container').length).toBe(1)
  })
})
