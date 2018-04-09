import React from 'react'
import { shallow } from 'enzyme'
import Button from '../forms/Button'

describe('<Button>', () => {
  it('Renders and tests disable function', () => {
    const buttonDisabled = shallow(<Button disabled={true}>Next</Button>)
    expect(buttonDisabled.props().disabled).toBeTruthy()

    const buttonDefault = shallow(<Button >Next</Button>)
    expect(buttonDefault.props().disabled).toBeFalsy();
    
  })
})