import React from 'react'
import { render } from 'enzyme'
import Footer from '../Footer'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = render(<Footer />)
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(0)
  })

  it('renders footer with topBar', () => {
    // have to use 'render' instead of 'shallow' to render nested components
    const footer = render(<Footer topBarBackground="black" />)
    expect(footer.find('footer').length).toBe(1)
    expect(footer.find('hr').length).toBe(1)
  })
})
