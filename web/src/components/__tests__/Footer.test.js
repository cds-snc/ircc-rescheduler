import React from 'react'
import { mount } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { getStore } from './LanguageSwitcher.test.js'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = mount(<Footer context={getStore('en')} />)
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
    const footer = mount(<Footer context={getStore('en')} />)
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).toMatch(/and Conditions/)
  })

  it('renders without "and Conditions" in French', () => {
    const footer = mount(<Footer context={getStore('fr')} />)
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).not.toMatch(/and Conditions/)
  })
})
