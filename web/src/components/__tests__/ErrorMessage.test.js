import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage, { ValidationMessage, ErrorList } from '../ErrorMessage'

const messages = [
  {
    component: ValidationMessage,
    toString: '<ValidationMessage />',
    alert: false,
  },
  {
    component: ErrorMessage,
    toString: '<ErrorMessage />',
    alert: true,
  },
]
messages.map(({ component, alert, toString }) => {
  describe(`${toString}`, () => {
    it('renders without a message or id', () => {
      const wrapper = shallow(React.createElement(component))
      expect(wrapper.find('span').length).toBe(1)
      expect(wrapper.find('span').text()).toEqual('')
      expect(wrapper.props().id).toBe(undefined)
      expect(wrapper.props().className).toMatch(/^empty/)
    })

    it('renders with a string message and an id', () => {
      const wrapper = shallow(
        React.createElement(component, {
          message: 'Not one step backwards!',
          id: 'order-227',
        }),
      )
      expect(wrapper.find('span').text()).toEqual('Not one step backwards!')
      expect(wrapper.props().id).toEqual('order-227')
      expect(wrapper.props().className).not.toMatch(/^empty/)
    })

    it('renders with a react element message and an id', () => {
      const wrapper = shallow(
        React.createElement(component, {
          message: React.createElement('p', null, 'Not one step backwards!'),
          id: 'order-227',
        }),
      )
      expect(wrapper.find('span p').text()).toEqual('Not one step backwards!')
      expect(wrapper.props().id).toEqual('order-227')
    })

    it(`renders ${alert ? 'with' : 'without'} alert attributes`, () => {
      const wrapper = shallow(
        React.createElement(component, {
          message: 'Not one step backwards!',
          id: 'order-227',
        }),
      )
      expect(wrapper.find('span').text()).toEqual('Not one step backwards!')
      if (alert) {
        expect(wrapper.props()).toHaveProperty('role', 'alert')
        expect(wrapper.props()).toHaveProperty('aria-live', 'assertive')
      } else {
        expect(wrapper.props()).not.toHaveProperty('role')
        expect(wrapper.props()).not.toHaveProperty('aria-live')
      }
    })
  })
})

describe(`<ErrorList />`, () => {
  it('renders without a message or children', () => {
    const wrapper = shallow(<ErrorList />)
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.find('h2').length).toBe(0)
    expect(wrapper.props().className).toMatch(/^empty/)
  })

  it('renders with a message but NO children', () => {
    const wrapper = shallow(<ErrorList message="This is a message" />)
    expect(wrapper.find('h2').length).toBe(0)
    expect(wrapper.find('p').length).toBe(0)
    expect(wrapper.props().className).toMatch(/^empty/)
  })

  it('renders with a message AND children', () => {
    const wrapper = shallow(
      <ErrorList message="This is a message">
        <span>This is a span</span>
      </ErrorList>,
    )
    expect(wrapper.find('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toEqual('This is a message')
    expect(wrapper.find('p').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Please take another look at the:')
    expect(wrapper.find('ul > li > span').text()).toEqual('This is a span')
    expect(wrapper.props().className).not.toMatch(/^empty/)
  })

  it('renders with NO message AND children', () => {
    const wrapper = shallow(
      <ErrorList>
        <span>This is a span</span>
      </ErrorList>,
    )
    expect(wrapper.find('h2').length).toBe(0)
    expect(wrapper.find('p').length).toBe(0)
    expect(wrapper.props().className).toMatch(/^empty/)
  })
})
