import React from 'react'
import { shallow } from 'enzyme'
import Contact from '../Contact'

describe('<Contact />', () => {
  it('renders itself and child', () => {
    const wrapper = shallow(
      <Contact>
        <h1>Get in touch ✉️</h1>
      </Contact>,
    )

    const div = wrapper.find('div')
    expect(div.length).toBe(1)

    const h1 = wrapper.find('h1')
    expect(h1.length).toBe(1)
    expect(h1.text()).toEqual('Get in touch ✉️')

    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toEqual('vancouverIRCC@cic.gc.ca')

    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toEqual('<TelLink />')
  })
})
