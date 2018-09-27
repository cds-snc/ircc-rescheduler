import React from 'react'
import { mount } from 'enzyme'
import Language from '../Language'
import { Context } from '../../context'

describe('<Language />', () => {
  it('returns language string passed-in the context', () => {
    const wrapper = mount(
      <Context.Provider value={{ store: { language: 'fr' } }}>
        <Language render={language => <span>Language: {language}</span>} />
      </Context.Provider>,
    )
    expect(wrapper.find('span').text()).toBe('Language: fr')
  })

  it('returns default language "en" when no language string exists in context', () => {
    const wrapper = mount(
      <Context.Provider value={{ store: {} }}>
        <Language render={language => <span>Language: {language}</span>} />
      </Context.Provider>,
    )
    expect(wrapper.find('span').text()).toBe('Language: en')
  })

  it('returns default language "en" when no context has been set', () => {
    const wrapper = mount(
      <Language render={language => <span>Language: {language}</span>} />,
    )
    expect(wrapper.find('span').text()).toBe('Language: en')
  })
})
