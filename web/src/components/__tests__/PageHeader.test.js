import React from 'react'
import { shallow } from 'enzyme'
import { PageHeaderBase as PageHeader } from '../PageHeader'
import { i18n } from 'lingui-i18n/dist'

describe('<PageHeader />', () => {
  it('renders', () => {
    const pageHeader = shallow(
      <PageHeader i18n={i18n}>
        <h1>Title</h1>
      </PageHeader>,
    )
    expect(pageHeader.find('header').length).toBe(1)
    expect(pageHeader.find('h1').text()).toMatch(/Title/)
  })
})
