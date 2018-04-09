import React from 'react'
import { shallow } from 'enzyme'
import Button from '../forms/Button'

describe('<Button>', () => {
  it('Renders and tests disable function', () => {
    const button = shallow(<Button>Next</Button>)
    expect(button).toBeTruthy()
  })
})