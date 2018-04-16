import React from 'react'
import { render, shallow } from 'enzyme'
import { TextField, TextFieldAdapter } from '../TextInput'

const defaultProps = {
  children: <label>Name</label>,
  id: 'id',
  name: 'name',
}

const defaultAdapterProps = {
  input: {},
  ...defaultProps,
}

const getAdapterAttrib = (adapter, attr) =>
  adapter.find('input')[0].attribs[attr]

describe('<TextField> component', () => {
  it('has props assigned correctly', () => {
    const textField = shallow(<TextField {...defaultProps} />)
    const tfInput = textField.find('input')
    expect(tfInput).toBeTruthy()
    expect(tfInput.props().type).toEqual('text')
    expect(tfInput.props().id).toEqual('id')
    expect(tfInput.props().name).toEqual('name')
  })

  it('renders label correctly', () => {
    const textField = shallow(<TextField {...defaultProps} />)
    expect(textField.find('label').text()).toMatch(/Name/)
  })
})

describe('<TextFieldAdapter> component', () => {
  it('has props assigned directly through input object', () => {
    const tfAdapter = render(<TextFieldAdapter {...defaultAdapterProps} />)
    expect(tfAdapter.find('input')).toBeTruthy()

    const tfInput = shallow(<TextField {...defaultProps} />).find('input')
    expect(getAdapterAttrib(tfAdapter, 'type')).toEqual(tfInput.props().type)
    expect(getAdapterAttrib(tfAdapter, 'id')).toEqual(tfInput.props().id)
    expect(getAdapterAttrib(tfAdapter, 'name')).toEqual(tfInput.props().name)
  })
})
