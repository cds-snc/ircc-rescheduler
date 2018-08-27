import React from 'react'
import { mount, render } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { getStore } from './LanguageSwitcher.test.js'
import { i18n } from '@lingui/core'
import { getEmail } from '../../locations'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = render(<Footer context={getStore('en')} i18n={i18n} />)
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'mount' instead of 'shallow' to render nested components
    const footer = mount(
      <Footer topBarBackground="black" context={getStore('en')} i18n={i18n} />,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })

  it('renders footer with IRCC email in contact information', () => {
    const footer = render(<Footer context={getStore('en')} i18n={i18n} />)
    expect(footer.find('footer').length).toBe(1)
    expect(
      footer
        .find('a')
        .first()
        .prop('href'),
    ).toEqual(`mailto:${getEmail()}`)
  })

  it('renders "and Conditions" in English', () => {
    const footer = mount(<Footer context={getStore('en')} i18n={i18n} />)
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).toMatch(/and Conditions/)
  })

  it('renders without "and Conditions" in French', () => {
    const footer = mount(<Footer context={getStore('fr')} i18n={i18n} />)
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).not.toMatch(/and Conditions/)
  })

  it('renders with Canadawordmark in French with corresponding alt attr', () => {
    const footer = mount(<Footer context={getStore('fr')} i18n={i18n} />)
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbole du gouvernement du Canada',
    )
  })

  it('renders with Canadawordmark in English with corresponding alt attr', () => {
    const footer = mount(<Footer context={getStore('en')} i18n={i18n} />)
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbol of the Government of Canada',
    )
  })
})
