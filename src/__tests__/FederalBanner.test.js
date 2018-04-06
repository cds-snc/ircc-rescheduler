import { shallow } from 'enzyme'
import FederalBanner from '../FederalBanner'
import React from 'react'

describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = shallow(<FederalBanner />)
    expect(federalBanner.find('svg')).toBeTruthy()
  })
})
