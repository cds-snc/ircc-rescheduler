import React from 'react'
import { render, shallow } from 'enzyme'
import { Radio, RadioAdapter } from '../MultipleChoice'

const defaultProps = {
  label: <span>Option</span>,
  value: 'option',
}

const getAdapterAttrib = (adapter, attr) =>
  adapter.find('input')[0].attribs[attr]

describe('<Radio> component', () => {
  it('has props assigned correctly', () => {
    const radio = shallow(<Radio {...defaultProps} />)
    expect(radio.find('input')).toBeTruthy()
    expect(radio.props().type).toEqual('radio')
    expect(radio.props().value).toEqual('option')
  })

  it('renders label correctly', () => {
    const radio = render(<Radio {...defaultProps} />)
    expect(radio.find('label > span').text()).toMatch(/Option/)
  })
})

describe('<RadioAdapter> component', () => {
  it('has props assigned directly through input object', () => {
    const radioAdapterProps = {
      input: { value: defaultProps.value },
      label: defaultProps.label,
    }
    const radioAdapter = render(<RadioAdapter {...radioAdapterProps} />)
    expect(radioAdapter.find('input')).toBeTruthy()

    const radio = shallow(<Radio {...defaultProps} />)
    expect(getAdapterAttrib(radioAdapter, 'type')).toEqual(radio.props().type)
    expect(getAdapterAttrib(radioAdapter, 'value')).toEqual(radio.props().value)
  })
})
