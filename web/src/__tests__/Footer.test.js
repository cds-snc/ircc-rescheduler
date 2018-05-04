import { shallow } from 'enzyme'
import Footer from '../Footer'
import React from 'react'

describe('<Footer />', () => {
  it('renders footer', () => {
    const footer = shallow(<Footer />)
    expect(footer.find('footer').length).toBe(1)
  })

  it('renders footer with topBar', () => {
    const topBar = shallow(<Footer topBarBackground="black" />)
    expect(topBar).toMatchObject(topBar)
  })
})
