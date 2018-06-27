import React from 'react'
import { mount } from 'enzyme'
import PhaseBanner from '../PhaseBanner'

describe('<PhaseBanner />', () => {
  it('will not render with ONLY children...Console error prompt to specify phase= ', () => {
    const phaseBanner = mount(<PhaseBanner>contact us</PhaseBanner>)
    expect(phaseBanner.find('span').at(1).length).toBe(0)
    expect(phaseBanner.find('span').at(2).length).toBe(0)
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

  it('will not render with invalid phase, Error Message will prompt for valid phase value', () => {
    const phaseBanner = mount(
      <PhaseBanner phase="omega">This is an omega banner</PhaseBanner>,
    )
    expect(phaseBanner.find('span').at(1).length).toBe(0)
    expect(phaseBanner.find('span').at(2).length).toBe(0)
  })
})
