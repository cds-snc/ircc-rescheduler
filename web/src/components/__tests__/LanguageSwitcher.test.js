import React from 'react'
import { shallow } from 'enzyme'
import { LanguageSwitcherBase as LanguageSwitcher } from '../LanguageSwitcher'
import { i18n } from 'lingui-i18n/dist'

export const getStore = lang => ({
  store: { language: lang },
  setStore: () => {},
})

describe('<LanguageSwitcher />', () => {
  describe('with { language: "en" } in the app context', () => {
    it('displays a button with "Français"', () => {
      const wrapper = shallow(
        <LanguageSwitcher context={getStore('en')} i18n={i18n} />,
      )
      expect(wrapper.find('button').text()).toMatch(/Français/)
    })
  })

  describe('with { language: "fr" } in the app context', () => {
    it('displays a button with "English"', () => {
      const wrapper = shallow(
        <LanguageSwitcher context={getStore('fr')} i18n={i18n} />,
      )
      expect(wrapper.find('button').text()).toMatch(/English/)
    })
  })

  describe('with { language: "" } in the app context', () => {
    it('displays a button with "Français"', () => {
      const wrapper = shallow(
        <LanguageSwitcher context={getStore('')} i18n={i18n} />,
      )
      expect(wrapper.find('button').text()).toMatch(/Français/)
    })
  })
})
