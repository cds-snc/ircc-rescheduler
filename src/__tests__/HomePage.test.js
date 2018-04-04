import { shallow } from 'enzyme'
import HomePage from '../HomePage'
import React from 'react'

describe('<HomePage />', () => {
  it('renders', () => {
    const home = shallow(<HomePage />)
    expect(home.is('div')).toBeTruthy()
  })
})
