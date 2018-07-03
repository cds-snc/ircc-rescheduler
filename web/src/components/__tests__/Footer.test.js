import React from 'react'
import { shallow, render } from 'enzyme'
import { FooterBase as Footer } from '../Footer'
import { getStore } from './LanguageSwitcher.test.js'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = shallow(<Footer context={getStore('en')} />)
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'render' instead of 'shallow' to render nested components
    const footer = render(
      <Footer topBarBackground="black" context={getStore('en')} />,
    )
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })
})
