import { shallow } from 'enzyme'
import PageHeader from '../PageHeader'
import React from 'react'

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
