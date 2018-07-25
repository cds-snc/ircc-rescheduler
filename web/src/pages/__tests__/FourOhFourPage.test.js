import { shallow } from 'enzyme'
import FourOhFourPage from '../FourOhFourPage'
import { H1 } from '../../styles'

import React from 'react'

describe('<FourOhFourPage />', () => {
  it('can be instantiated', () => {
    const wrapper = shallow(<FourOhFourPage match={{ path: '/404' }} />)
    // this is because our custom H1 component has a Trans component inside of it
    expect(wrapper.find(H1).props().children.props.id).toEqual('Page not found')
  })
})
