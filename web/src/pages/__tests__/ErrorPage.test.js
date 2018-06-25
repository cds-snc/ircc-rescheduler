import { shallow, mount } from 'enzyme'
import ErrorPage, { ErrorPageContent } from '../ErrorPage'
import React from 'react'
import { MemoryRouter } from 'react-router'

describe('<ErrorPageContent />', () => {
  it('can be instantiated', () => {
    const wrapper = shallow(<ErrorPageContent />)
    // have to use mount so that we don't get <withI18N />
    const header = mount(wrapper.props().children[0])
    expect(header.text()).toEqual("We're sorry, something went wrong.")
  })
})

describe('<ErrorPage />', () => {
  it('can be instantiated', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <ErrorPage />
      </MemoryRouter>,
    )
    expect(wrapper.find(ErrorPage)).toHaveLength(1)
  })
})
