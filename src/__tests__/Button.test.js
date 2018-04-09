import React from 'react'
import { shallow } from 'enzyme'
import Button from '../forms/Button'

describe('<Button>', () => {
  it('Renders the button component and also tests to make sure disabled = true', () => {
    const buttonDisabled = shallow(<Button disabled={true}>Next</Button>)
    expect(buttonDisabled.props().disabled).toBeTruthy()
  })
  it('Renders the button component and also tests to make sure disabled = false', () => {
    const buttonDefault = shallow(<Button>Next</Button>)
    expect(buttonDefault.props().disabled).toBeFalsy()
  })
})
