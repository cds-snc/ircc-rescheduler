import { shallow, mount } from 'enzyme'
import ErrorPage from '../ErrorPage'
import React from 'react'

describe('<ErrorPage />', () => {
  it('can be instantiated', () => {
    const wrapper = shallow(<ErrorPage />)
    // have to use mount so that we don't get <withI18N />
    const header = mount(wrapper.props().children[0])
    expect(header.text()).toEqual('Request failed')
  })
})
