import React from 'react'
import { shallow } from 'enzyme'
import { FederalBannerBase as FederalBanner } from '../FederalBanner'
import { getStore } from './LanguageSwitcher.test.js'

describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = shallow(<FederalBanner context={getStore('en')} />)
    expect(federalBanner.find('.svg-container').length).toBe(1)
  })
})
