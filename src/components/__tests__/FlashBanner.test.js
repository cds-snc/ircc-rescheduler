import React from 'react'
import { shallow } from 'enzyme'
import FlashBanner from '../FlashBanner'

describe('<FlashBanner />', () => {
  it('renders an H2 with an alert role and a tabindex', () => {
    const wrapper = shallow(<FlashBanner />)

    const h2 = wrapper.find('h2')
    expect(h2.props().role).toEqual('alert')
    expect(h2.props().tabIndex).toEqual('0')
  })
})
