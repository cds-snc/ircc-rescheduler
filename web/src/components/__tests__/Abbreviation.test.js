import React from 'react'
import { render, mount } from 'enzyme'
import { i18n } from 'lingui-i18n/dist'
import Abbreviation from '../Abbreviation'

export const getStore = lang => ({
  store: { language: lang },
  setStore: () => {},
})

describe('<Abbreviation />', () => {
  it('renders abbreviation', () => {
    const abbreviation = render(
      <Abbreviation context={getStore('en')} i18n={i18n} />,
    )
    expect(abbreviation.find('abbr').length).toBe(1)
  })

  it('renders abbreviation with ENGLISH title', () => {
    const abbreviation = render(
      <Abbreviation context={getStore('en')} i18n={i18n} />,
    )
    expect(abbreviation.find('abbr').prop('title')).toEqual(
      'Immigration, Refugees and Citizenship Canada',
    )
  })

  it('renders abbreviation with FRENCH title', () => {
    const abbreviation = render(
      <Abbreviation context={getStore('fr')} i18n={i18n} />,
    )
    expect(abbreviation.find('abbr').prop('title')).toEqual(
      'Immigration, Réfugiés et Citoyenneté Canada',
    )
  })
})
