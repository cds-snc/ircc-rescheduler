import { shallow, mount } from 'enzyme'
import CancelPage from '../CancelPage'
import React from 'react'

describe('<CancelPage />', () => {
  it('can be instantiated', () => {
    const wrapper = shallow(<CancelPage />)
    // have to use mount so that we don't get <withI18N />
    const header = mount(wrapper.props().children[0])
    expect(header.text()).toEqual('Canceled')
  })
})
