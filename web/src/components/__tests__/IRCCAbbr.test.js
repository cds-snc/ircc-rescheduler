import React from 'react'
import { render } from 'enzyme'
import IRCCAbbr from '../IRCCAbbr'
import { I18nProvider } from 'lingui-react'
import { i18n } from 'lingui-i18n/dist'
import { catalogs } from '../../utils/linguiUtils'

describe('<IRCCAbbr />', () => {
  it('renders IRCC abbreviation tag', () => {
    const abbreviation = render(
      <I18nProvider language={'en'} catalogs={catalogs}>
        <IRCCAbbr i18n={i18n} />
      </I18nProvider>,
    )
    expect(abbreviation.find('abbr').length).toBe(1)
  })

  it('renders IRCC abbreviation tag with ENGLISH title', () => {
    const abbreviation = render(
      <I18nProvider language={'en'} catalogs={catalogs}>
        <IRCCAbbr i18n={i18n} />
      </I18nProvider>,
    )
    expect(abbreviation.find('abbr').attr('title')).toEqual(
      'Immigration, Refugees and Citizenship Canada',
    )
  })

  it('renders IRCC abbreviation tag with FRENCH title', () => {
    const abbreviation = render(
      <I18nProvider language={'fr'} catalogs={catalogs}>
        <IRCCAbbr i18n={i18n} />
      </I18nProvider>,
    )
    expect(abbreviation.find('abbr').attr('title')).toEqual(
      'Immigration, Réfugiés et Citoyenneté Canada',
    )
  })
})
