import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from '../ErrorMessage'

describe('<ErrorMessage />', () => {
  it('renders without a message or id', () => {
    const wrapper = shallow(<ErrorMessage />)
    expect(wrapper.find('span').length).toBe(1)
    expect(wrapper.find('span').text()).toEqual('')
    expect(wrapper.props().id).toBe(undefined)
  })

  it('renders with a string message and an id', () => {
    const wrapper = shallow(
      <ErrorMessage message="Not one step backwards!" id="order-227" />,
    )
    expect(wrapper.find('span').length).toBe(1)
    expect(wrapper.find('span').text()).toEqual('Not one step backwards!')
    expect(wrapper.props().id).toEqual('order-227')
  })

  it('renders with a react element message and an id', () => {
    const wrapper = shallow(
      <ErrorMessage message={<p>Not one step backwards!</p>} id="order-227" />,
    )
    expect(wrapper.find('span p').length).toBe(1)
    expect(wrapper.find('span p').text()).toEqual('Not one step backwards!')
    expect(wrapper.props().id).toEqual('order-227')
  })
})
