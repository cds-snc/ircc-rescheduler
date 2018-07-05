import React from 'react'
import { shallow, mount } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { getStore } from './LanguageSwitcher.test.js'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = shallow(<Footer context={getStore('en')} />)
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'mount' instead of 'shallow' to render nested components
    const footer = mount(
      <Footer topBarBackground="black" context={getStore('en')} />,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })

  it('renders "and Conditions" in English', () => {
    const footer = shallow(<Footer context={getStore('en')} />)
    let termsLink = footer.find('a').at(2)
    expect(termsLink.text()).toMatch(/and Conditions/)
    expect(termsLink.props().href).toEqual(
      'https://digital.canada.ca/legal/terms/',
    )
  })

  it('renders without "and Conditions" in French', () => {
    const footer = shallow(<Footer context={getStore('fr')} />)
    let termsLink = footer.find('a').at(2)
    expect(termsLink.text()).not.toMatch(/and Conditions/)
    expect(termsLink.props().href).toEqual(
      'https://numerique.canada.ca/transparence/avis/',
    )
  })
})
