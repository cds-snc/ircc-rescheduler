import React from 'react'
import { shallow } from 'enzyme'
import { LanguageSwitcherBase as LanguageSwitcher } from '../LanguageSwitcher'

export const getStore = lang => ({
  store: { language: lang },
  setStore: () => {},
})

describe('<LanguageSwitcher />', () => {
  describe('with { language: "en" } in the app context', () => {
    it('displays a button with "Français"', () => {
      const wrapper = shallow(<LanguageSwitcher context={getStore('en')} />)
      expect(wrapper.find('button').text()).toMatch(/Français/)
    })
  })

  describe('with { language: "fr" } in the app context', () => {
    it('displays a button with "English"', () => {
      const wrapper = shallow(<LanguageSwitcher context={getStore('fr')} />)
      expect(wrapper.find('button').text()).toMatch(/English/)
    })
  })

  describe('with { language: "" } in the app context', () => {
    it('displays a button with "Français"', () => {
      const wrapper = shallow(<LanguageSwitcher context={getStore('')} />)
      expect(wrapper.find('button').text()).toMatch(/Français/)
    })
  })
})
