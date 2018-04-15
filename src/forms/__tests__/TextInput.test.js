import React from 'react'
import { shallow } from 'enzyme'
import { TextField } from '../TextInput'

const defaultProps = {
  children: <label>Name</label>,
  id: 'id',
  name: 'name',
}

describe('<TextField> component', () => {
  it('has props assigned correctly', () => {
    const textField = shallow(<TextField {...defaultProps} />)
    const textFieldInput = textField.find('input')
    expect(textFieldInput).toBeTruthy()
    expect(textFieldInput.props().type).toEqual('text')
    expect(textFieldInput.props().id).toEqual('id')
    expect(textFieldInput.props().name).toEqual('name')
  })

  it('renders label correctly', () => {
    const textField = shallow(<TextField {...defaultProps} />)
    expect(textField.find('label').text()).toMatch(/Name/)
  })
})
