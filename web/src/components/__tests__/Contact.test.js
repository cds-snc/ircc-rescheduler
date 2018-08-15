import React from 'react'
import { shallow } from 'enzyme'
import Contact, { TelLink } from '../Contact'
import { getEmail } from '../../locations/vancouver'

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
  it('renders with children', () => {
    const wrapper = shallow(
      <Contact>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    const div = wrapper.find('div')
    expect(div.length).toBe(1)

    const h1 = wrapper.find('h1')
    expect(h1.text()).toEqual('Get in touch ✉️')
  })

  it('renders with the email first and the telephone number second', () => {
    const wrapper = shallow(
      <Contact>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    let emailLink = wrapper
      .find('p')
      .at(0)
      .find('a')
    expect(emailLink.text()).toEqual(getEmail())
    expect(emailLink.props().href).toEqual(`mailto:${getEmail()}`)

    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toEqual('<withI18n /> <TelLink />')
  })

  it('renders with the email first and the telephone number second', () => {
    const wrapper = shallow(
      <Contact phoneFirst={true}>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toEqual('<withI18n /> <TelLink />')

    let emailLink = wrapper
      .find('p')
      .at(1)
      .find('a')

    expect(emailLink.text()).toEqual(getEmail())
    expect(emailLink.props().href).toEqual(`mailto:${getEmail()}`)
  })
})
