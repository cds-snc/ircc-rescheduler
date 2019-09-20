import React from 'react'
import { shallow } from 'enzyme'
import { PageHeaderBase as PageHeader } from '../PageHeader'
import { i18n } from '@lingui/core'

describe('<PageHeader />', () => {
  it('renders', () => {
    const pageHeader = shallow(
      <PageHeader i18n={i18n}>
        <h1>Title</h1>
      </PageHeader>,
    )
    expect(pageHeader.find('div').length).toBe(2)
    expect(pageHeader.find('h1').text()).toMatch(/Title/)
  })
})
