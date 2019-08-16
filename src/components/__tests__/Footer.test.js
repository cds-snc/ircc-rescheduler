import React from 'react'
import { mount, render } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { i18n } from '@lingui/core'
import { Context } from '../../context'
import MemoryRouter from 'react-router-dom/MemoryRouter'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = render(
      <MemoryRouter>
        <Footer topBarBackground i18n={i18n} />
      </MemoryRouter>,
    )
    expect(footer.find('footer').length).toBe(0)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'mount' instead of 'shallow' to render nested components
    const footer = mount(
      <MemoryRouter>
        <Footer topBarBackground i18n={i18n} />
      </MemoryRouter>,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })


  xit('renders "and Conditions" in English', () => {
    const footer = mount(
      <MemoryRouter>
        <Footer topBarBackground i18n={i18n} />
      </MemoryRouter>,
    )
    expect(
      footer
        .find('a')
        .at(2)
        .text(),
    ).toMatch(/and Conditions/)
  })

  xit('renders without "and Conditions" in French', () => {
    console.error = jest.fn() // eslint-disable-line no-console
    const footer = mount(
      <Context.Provider value={{ store: { language: 'fr' } }}>
        <MemoryRouter>
          <Footer topBarBackground i18n={i18n} />
        </MemoryRouter>
      </Context.Provider>,
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
      <Context.Provider value={{ store: { language: 'fr' } }}>
        <MemoryRouter>
          <Footer topBarBackground i18n={i18n} />
        </MemoryRouter>
      </Context.Provider>,
    )
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbole du gouvernement du Canada',
    )
  })

  it('renders with Canadawordmark in English with corresponding alt attr', () => {
    const footer = mount(
      <MemoryRouter>
        <Footer topBarBackground i18n={i18n} />
      </MemoryRouter>,
    )
    expect(footer.find('img').length).toBe(1)
    expect(footer.find('img').prop('alt')).toEqual(
      'Symbol of the Government of Canada',
    )
  })
})
