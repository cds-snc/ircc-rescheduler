import React from 'react'
import { shallow } from 'enzyme'
import PageHeader from '../PageHeader'

describe('<PageHeader />', () => {
  it('renders', () => {
    const pageHeader = shallow(
      <PageHeader>
        <h1>Title</h1>
      </PageHeader>,
    )
    expect(pageHeader.find('header').length).toBe(1)
    expect(pageHeader.find('h1').text()).toMatch(/Title/)
  })
})
