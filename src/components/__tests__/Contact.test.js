import React from 'react'
import { shallow } from 'enzyme'
import ContactWrapper, { ContactInfo as Contact, TelLink } from '../Contact'

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
    const locations = require('../../locations')
    locations.getEmail = jest.fn(() => 'paul@paul.ca')
    locations.getEmailParts = jest.fn(() => ['paul', 'paul.ca'])

    const wrapper = shallow(
      <Contact>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    let emailLink = wrapper
      .find('p')
      .at(0)
      .find('a')
    expect(emailLink.text()).toEqual('paul@paul.ca')
    expect(emailLink.props().href).toEqual('mailto:paul@paul.ca')

    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toEqual('<WithI18n /> <TelLink />')
  })

  it('renders with the email first and the telephone number second', () => {
    const locations = require('../../locations')
    locations.getEmail = jest.fn(() => 'paul@paul.ca')
    locations.getEmailParts = jest.fn(() => ['paul', 'paul.ca'])

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
    ).toEqual('<WithI18n /> <TelLink />')

    let emailLink = wrapper
      .find('p')
      .at(1)
      .find('a')

    expect(emailLink.text()).toEqual('paul@paul.ca')
    expect(emailLink.props().href).toEqual('mailto:paul@paul.ca')
  })
})

describe('<ContactWrapper />', () => {
  it('renders Contact information if phone number exists', () => {
    const locations = require('../../locations')
    locations.getPhone = jest.fn(() => false)

    const wrapper = shallow(
      <ContactWrapper>
        <h1>Get in touch ✉️</h1>
      </ContactWrapper>,
    )

    expect(wrapper.find('h1').length).toEqual(0)
  })

  it('does not render Contact information if no phone number exists', () => {
    const locations = require('../../locations')
    locations.getPhone = jest.fn(() => true)

    const wrapper = shallow(
      <ContactWrapper>
        <h1>Get in touch ✉️</h1>
      </ContactWrapper>,
    )

    expect(wrapper.find('h1').text()).toEqual('Get in touch ✉️')
  })
})
