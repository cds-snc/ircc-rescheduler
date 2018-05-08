import React from 'react'
import { Trans } from 'lingui-react'
import { mount } from 'enzyme'
import { Summary } from '../Summary'

describe('<Summary />', () => {
  it('renders expected values', () => {
    const wrapper = mount(
      <Summary
        fullName={'Pat Patterson'}
        paperFileNumber={'1234'}
        explanation={'out doing research'}
        reason={<Trans>school</Trans>}
      />,
    )
    expect(wrapper.text()).toMatch(/Full name:Pat Patterson/)
    expect(wrapper.text()).toMatch(/Paper file number:1234/)
    expect(wrapper.text()).toMatch(/Reason:school/)
    expect(wrapper.text()).toMatch(/Explanation:out doing research/)
  })
})
