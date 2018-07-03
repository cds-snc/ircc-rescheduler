import { shallow, mount } from 'enzyme'
import FourOhFourPage from '../FourOhFourPage'
import React from 'react'

describe('<FourOhFourPage />', () => {
  it('can be instantiated', () => {
    const wrapper = shallow(<FourOhFourPage />)
    // have to use mount so that we don't get "<withI18N />"
    const header = mount(wrapper.props().children[0])
    expect(header.text()).toEqual('Page not found')
  })
})
