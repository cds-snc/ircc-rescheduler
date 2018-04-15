import React from 'react'
import { render, shallow } from 'enzyme'
import { Radio } from '../MultipleChoice'

const defaultProps = {
  label: <span>Option</span>,
  value: 'option',
}

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
