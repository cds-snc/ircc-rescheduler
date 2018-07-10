import React from 'react'
import { mount, render } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { getStore } from './LanguageSwitcher.test.js'
import { i18n } from 'lingui-i18n/dist'
import { I18nProvider } from 'lingui-react'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = render(
      <I18nProvider>
        <Footer context={getStore('en')} i18n={i18n} />
      </I18nProvider>,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'mount' instead of 'shallow' to render nested components
    const footer = mount(
      <I18nProvider>
        <Footer topBarBackground="black" context={getStore('en')} i18n={i18n} />
      </I18nProvider>,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })

  it('renders "and Conditions" in English', () => {
    const footer = mount(
      <I18nProvider>
        <Footer context={getStore('en')} i18n={i18n} />
      </I18nProvider>,
    )
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).toMatch(/and Conditions/)
  })

  it('renders without "and Conditions" in French', () => {
    const footer = mount(
      <I18nProvider>
        <Footer context={getStore('fr')} i18n={i18n} />
      </I18nProvider>,
    )
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).not.toMatch(/and Conditions/)
  })

  it('renders with Canadawordmark in French with corresponding alt attr', () => {
    const footer = mount(
      <I18nProvider>
        <Footer context={getStore('fr')} i18n={i18n} />{' '}
      </I18nProvider>,
    )
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbole du gouvernement du Canada',
    )
  })

  it('renders with Canadawordmark in English with corresponding alt attr', () => {
    const footer = mount(
      <I18nProvider>
        <Footer context={getStore('en')} i18n={i18n} />{' '}
      </I18nProvider>,
    )
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbol of the Government of Canada',
    )
  })
})
