import { mount } from 'enzyme'
import CancelPage from '../CancelPage'
import React from 'react'
import { MemoryRouter } from 'react-router'

describe('<CancelPage />', () => {
  it.skip('can be instantiated', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/cancel']}>
        <div>
          <CancelPage />
        </div>
      </MemoryRouter>,
    )

    expect(wrapper.find(CancelPage)).toHaveLength(1)
  })
})
