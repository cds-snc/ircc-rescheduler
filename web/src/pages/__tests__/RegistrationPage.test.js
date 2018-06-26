import React from 'react'
import { shallow } from 'enzyme'
import RegistrationPage from '../RegistrationPage'

describe('<RegistrationPage />', () => {
  it('renders', () => {
    const wrapper = shallow(<RegistrationPage />)

    expect(wrapper.instance().constructor.name).toEqual('WithProvider')
    expect(wrapper.text()).toEqual('<withContext(RegistrationPage) />')
    expect(wrapper.length).toBe(1)
  })
})
