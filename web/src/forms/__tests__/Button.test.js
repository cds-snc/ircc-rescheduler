import React from 'react'
import { shallow } from 'enzyme'
import Button from '../Button'

describe('<Button>', () => {
  it('Renders the Button component', () => {
    const button = shallow(<Button disabled={true}>Next</Button>)
    expect(button.find('button').length).toBe(1)
  })

  it('Renders the Button component and also tests to make sure disabled = true', () => {
    const button = shallow(<Button disabled={true}>Next</Button>)
    expect(button.props().disabled).toBeTruthy()
  })
  it('Renders the Button component and also tests to make sure disabled = false', () => {
    const button = shallow(<Button disabled={false}>Next</Button>)
    expect(button.props().disabled).toBeFalsy()
  })
})
