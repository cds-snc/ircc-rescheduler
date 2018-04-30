import React from 'react'
import { render, shallow } from 'enzyme'
import {
  TextField,
  TextFieldAdapter,
  TextArea,
  TextAreaAdapter,
} from '../TextInput'

const defaultProps = {
  children: <label>Name</label>,
  id: 'id',
  name: 'name',
}

const defaultAdapterProps = {
  input: { value: '', onChange: () => {} },
  ...defaultProps,
}

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
  const getAdapterAttrib = (adapter, attr) =>
    adapter.find('input')[0].attribs[attr] // eslint-disable-line  security/detect-object-injection

  it('has props assigned directly through input object', () => {
    const tfAdapter = render(<TextFieldAdapter {...defaultAdapterProps} />)
    expect(tfAdapter.find('input')).toBeTruthy()

    const tfInput = shallow(<TextField {...defaultProps} />).find('input')
    expect(getAdapterAttrib(tfAdapter, 'type')).toEqual(tfInput.props().type)
    expect(getAdapterAttrib(tfAdapter, 'id')).toEqual(tfInput.props().id)
    expect(getAdapterAttrib(tfAdapter, 'name')).toEqual(tfInput.props().name)
  })
})

describe('<TextArea> component', () => {
  it('has props assigned correctly', () => {
    const textArea = shallow(<TextArea {...defaultProps} />)
    const taInput = textArea.find('textarea')
    expect(taInput).toBeTruthy()
    expect(taInput.props().id).toEqual('id')
    expect(taInput.props().name).toEqual('name')
  })

  it('renders label correctly', () => {
    const textArea = shallow(<TextArea {...defaultProps} />)
    expect(textArea.find('label').text()).toMatch(/Name/)
  })
})

describe('<TextAreaAdapter> component', () => {
  const getAdapterAttrib = (adapter, attr) =>
    adapter.find('textarea')[0].attribs[attr] // eslint-disable-line  security/detect-object-injection

  it('has props assigned directly through input object', () => {
    const taAdapter = render(<TextAreaAdapter {...defaultAdapterProps} />)
    expect(taAdapter.find('textarea')).toBeTruthy()

    const taInput = shallow(<TextArea {...defaultProps} />).find('textarea')
    expect(getAdapterAttrib(taAdapter, 'id')).toEqual(taInput.props().id)
    expect(getAdapterAttrib(taAdapter, 'name')).toEqual(taInput.props().name)
  })
})
