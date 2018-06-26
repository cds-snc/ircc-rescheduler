import React from 'react'
import { shallow, mount } from 'enzyme'
import PhaseBanner from '../PhaseBanner'

describe('<PhaseBanner />', () => {
  it('will not render with ONLY children...Console error prompt to specify phase= ', () => {
    const phaseBanner = shallow(<PhaseBanner>contact us</PhaseBanner>)
    expect(phaseBanner.find('span').length).toBe(0)
  })

  it('will render an alpha badge + children', () => {
    const phaseBanner = mount(
      <PhaseBanner phase="alpha"> this is an alpha banner.</PhaseBanner>,
    )
    expect(
      phaseBanner
        .find('span')
        .at(1)
        .text(),
    ).toMatch(/ALPHA/)
    expect(
      phaseBanner
        .find('span')
        .at(2)
        .text(),
    ).toMatch(/this is an alpha banner./)
  })

  it('will render a beta badge + children', () => {
    const phaseBanner = mount(
      <PhaseBanner phase="beta"> this is a beta banner.</PhaseBanner>,
    )
    expect(
      phaseBanner
        .find('span')
        .at(1)
        .text(),
    ).toMatch(/BETA/)
    expect(
      phaseBanner
        .find('span')
        .at(2)
        .text(),
    ).toMatch(/this is a beta banner./)
  })
})
