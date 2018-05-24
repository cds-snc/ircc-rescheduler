import React from 'react'
import { shallow } from 'enzyme'
import Contact, { TelLink } from '../Contact'

describe('<TelLink />', () => {
  it('renders span and an anchor link', () => {
    const wrapper = shallow(<TelLink tel="123-456" />)

    const span = wrapper.find('span > span')
    expect(span.text()).toBe('123-456')

    const anchor = wrapper.find('span > a')
    expect(anchor.text()).toBe('123-456')
    expect(anchor.props().href).toBe('tel:+123-456')
  })
})

describe('<Contact />', () => {
  it('renders itself and child', () => {
    const wrapper = shallow(
      <Contact>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    const div = wrapper.find('div')
    expect(div.length).toBe(1)

    const h1 = wrapper.find('h1')
    expect(h1.text()).toEqual('Get in touch ✉️')

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toEqual('vancouverIRCC@cic.gc.ca')

    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toEqual('<TelLink />')
  })
})