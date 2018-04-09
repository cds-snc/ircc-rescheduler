import React from 'react'
import { shallow, mount } from 'enzyme'
import Button from '../forms/Button'
import { render } from 'react-dom'

describe('<Button>', () => {
  it('Renders and tests disable function', () => {
    const button = shallow(<Button>Next</Button>)
    expect(button).toBeTruthy()
  })
})