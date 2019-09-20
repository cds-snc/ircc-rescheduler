import React from 'react'
import { render, shallow } from 'enzyme'
import {
  Radio,
  RadioAdapter,
  Checkbox,
  CheckboxAdapter,
} from '../MultipleChoice'

const defaultProps = {
  label: <span>Option</span>,
  value: 'option',
}

const defaultAdapterProps = {
  input: { value: defaultProps.value, onChange: () => {} },
  label: defaultProps.label,
}

const getAdapterAttrib = (adapter, attr) =>
  adapter.find('input')[0].attribs[attr] // eslint-disable-line  security/detect-object-injection

describe('<Radio> component', () => {
  it('has props assigned correctly', () => {
    const radio = shallow(<Radio {...defaultProps} />)
    expect(radio.props().type).toEqual('radio')
    expect(radio.props().value).toEqual('option')
  })

  it('allows passing through abritrary props', () => {
    const radio = shallow(
      <Radio {...defaultProps} aria-labelledby="radio-label" whizz="bang" />,
    )
    expect(radio.props()['aria-labelledby']).toEqual('radio-label')
    expect(radio.props().whizz).toEqual('bang')
  })

  it('renders label correctly', () => {
    const radio = render(<Radio {...defaultProps} />)
    expect(radio.find('input').length).toBe(1)
    expect(radio.find('label > span').text()).toMatch(/Option/)
    expect(radio.find('label').prop('id')).toBeUndefined()
  })

  it('renders label correctly with an id', () => {
    const radio = render(<Radio {...defaultProps} id="radio" />)
    expect(radio.find('input').length).toBe(1)
    expect(radio.find('label').prop('id')).toEqual('radio-label')
  })
})

describe('<RadioAdapter> component', () => {
  it('has props assigned directly through input object', () => {
    const radioAdapter = render(<RadioAdapter {...defaultAdapterProps} />)
    expect(radioAdapter.find('input').length).toBe(1)

    const radio = shallow(<Radio {...defaultProps} />)
    expect(getAdapterAttrib(radioAdapter, 'type')).toEqual(radio.props().type)
    expect(getAdapterAttrib(radioAdapter, 'value')).toEqual(radio.props().value)
  })
})

describe('<Checkbox> component', () => {
  it('has props assigned correctly', () => {
    const checkbox = shallow(<Checkbox {...defaultProps} />)
    expect(checkbox.props().type).toEqual('checkbox')
    expect(checkbox.props().value).toEqual('option')
  })

  it('allows passing through abritrary props', () => {
    const checkbox = shallow(
      <Checkbox
        {...defaultProps}
        aria-labelledby="checkbox-label"
        whizz="bang"
      />,
    )
    expect(checkbox.props()['aria-labelledby']).toEqual('checkbox-label')
    expect(checkbox.props().whizz).toEqual('bang')
  })

  it('renders label correctly', () => {
    const checkbox = render(<Checkbox {...defaultProps} />)
    expect(checkbox.find('input').length).toBe(1)
    expect(checkbox.find('label > span').text()).toMatch(/Option/)
    expect(checkbox.find('label').prop('id')).toBeUndefined()
  })

  it('renders label correctly with an id', () => {
    const radio = render(<Radio {...defaultProps} id="checkbox" />)
    expect(radio.find('input').length).toBe(1)
    expect(radio.find('label').prop('id')).toEqual('checkbox-label')
  })
})

describe('<CheckboxAdapter> component', () => {
  it('has props assigned directly through input object', () => {
    const cbAdapter = render(<CheckboxAdapter {...defaultAdapterProps} />)
    expect(cbAdapter.find('input').length).toBe(1)

    const checkbox = shallow(<Checkbox {...defaultProps} />)
    expect(getAdapterAttrib(cbAdapter, 'type')).toEqual(checkbox.props().type)
    expect(getAdapterAttrib(cbAdapter, 'value')).toEqual(checkbox.props().value)
  })
})
