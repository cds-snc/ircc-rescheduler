import React, { Fragment } from 'react'
import { shallow, mount } from 'enzyme'
import { SummaryRow } from '../Summary'
import MemoryRouter from 'react-router-dom/MemoryRouter'

describe('<SummaryRow />', () => {
  it('renders the correct data', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SummaryRow
          summaryHeader={<div>The header</div>}
          summaryBody="The body"
          summaryLink="https://google.ca"
          summaryLabel="The Label"
        />
      </MemoryRouter>,
    )
    expect(wrapper.find('h2 div').text()).toEqual('The header')
    expect(wrapper.find('a').prop('aria-label')).toEqual('The Label')
  })
})
