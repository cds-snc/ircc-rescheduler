import React from 'react'
import { shallow, mount } from 'enzyme'
import TelLink from '../TelLink'

describe('<TelLink />', () => {
  it('renders span and an anchor link', () => {
    const wrapper = shallow(<TelLink tel="123-456" />)

    const span = wrapper.find('span > span')
    expect(span.length).toBe(1)
    expect(span.text()).toBe('123-456')

    const anchor = wrapper.find('span > a')
    expect(anchor.length).toBe(1)
    expect(anchor.text()).toBe('123-456')
    expect(anchor.props().href).toBe('tel:+123-456')
  })
})
