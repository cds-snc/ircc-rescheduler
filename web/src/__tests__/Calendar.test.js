import React from 'react'
import { mount } from 'enzyme'
import { Calendar } from '../Calendar'

const clickFirstDate = wrapper => {
  return wrapper
    .find('.DayPicker-Day[aria-disabled=false]')
    .first()
    .simulate('click')
}

describe('<Calendar />', () => {
  it('renders June and July 2018', () => {
    /* TODO: create a calendar adaptor so that we don't need input */
    const wrapper = mount(<Calendar input={{ value: '', onChange: {} }} />)
    expect(wrapper.text()).toMatch(/June 2018/)
    expect(wrapper.text()).toMatch(/July 2018/)
  })

  it('selects a date when it is clicked', () => {
    /* TODO: create a calendar adaptor so that we don't need input */
    const wrapper = mount(
      <Calendar input={{ value: '', onChange: () => {} }} />,
    )
    expect(wrapper.find('#selectedDays').text()).toMatch('No dates selected')

    // click the first available day (June 1st, 2018)
    clickFirstDate(wrapper)

    expect(wrapper.find('#selectedDays').text()).toMatch(
      '1. 2018-06-01T12:00:00.000',
    )
  })

  it('unselects a date when it is clicked twice', () => {
    /* TODO: create a calendar adaptor so that we don't need input */
    const wrapper = mount(
      <Calendar input={{ value: '', onChange: () => {} }} />,
    )
    expect(wrapper.find('#selectedDays').text()).toMatch('No dates selected')

    // click the first available day (June 1st, 2018) twice
    clickFirstDate(wrapper)
    clickFirstDate(wrapper)

    expect(wrapper.find('#selectedDays').text()).toMatch('No dates selected')
  })
})
