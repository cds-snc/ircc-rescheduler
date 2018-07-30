import React from 'react'
import { mount } from 'enzyme'
import PhaseBanner from '../PhaseBanner'

describe('<PhaseBanner />', () => {
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

  it('will not render a badge if invalid phase submitted, will log error message', () => {
    const mockFn = jest.fn()
    console.error = mockFn // eslint-disable-line no-console
    const phaseBanner = mount(
      <PhaseBanner phase="omega">This is an omega banner</PhaseBanner>,
    )
    expect(phaseBanner.find('span').at(1).length).toBe(0)
    expect(phaseBanner.find('span').at(2).length).toBe(0)
    // first argument of call to console.error
    expect(mockFn.mock.calls[0][0]).toMatch(
      "Warning: Failed prop type: Invalid phase 'omega', try 'alpha' or 'beta'",
    )
  })

  it('will not render a badge if no phase submitted, will log error message', () => {
    const mockFn = jest.fn()
    console.error = mockFn // eslint-disable-line no-console
    const phaseBanner = mount(<PhaseBanner>contact us</PhaseBanner>)
    expect(phaseBanner.find('span').at(1).length).toBe(0)
    expect(phaseBanner.find('span').at(2).length).toBe(0)
    // first argument of call to console.error
    expect(mockFn.mock.calls[0][0]).toMatch(
      "Warning: Failed prop type: Please specify whether your project is in 'alpha' or 'beta'",
    )
  })
})
