import React from 'react'
import { mount } from 'enzyme'
import { CalendarAdapter } from '../Calendar'

const clickFirstDate = wrapper => {
  return wrapper
    .find('.DayPicker-Day[aria-disabled=false]')
    .first()
    .simulate('click')
}

const defaultProps = ({ value = '' } = {}) => {
  return {
    input: { value: value, onChange: () => {} },
  }
}

describe('<CalendarAdapter />', () => {
  it('renders June and July 2018', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.text()).toMatch(/June 2018/)
    expect(wrapper.text()).toMatch(/July 2018/)
  })

  it('will prefill a date if an initial value is provided', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({ value: [new Date('2018-06-01T12:00:00.000')] })}
      />,
    )

    expect(wrapper.find('#selectedDays').text()).toEqual('1. Fri Jun 01 2018')
  })

  it('will prefill multiple dates if multiple initial values are provided', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [
            new Date('2018-06-01T12:00:00.000'),
            new Date('2018-06-05T12:00:00.000'),
          ],
        })}
      />,
    )

    expect(wrapper.find('#selectedDays').text()).toEqual(
      '1. Fri Jun 01 20182. Tue Jun 05 2018',
    )
  })

  it('selects a date when it is clicked', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)

    expect(wrapper.find('#selectedDays').text()).toEqual('No dates selected')

    // click the first available day (June 1st, 2018)
    clickFirstDate(wrapper)

    expect(wrapper.find('#selectedDays').text()).toEqual('1. Fri Jun 01 2018')
  })

  it('unselects a date when it is clicked twice', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)

    expect(wrapper.find('#selectedDays').text()).toEqual('No dates selected')

    // click the first available day (June 1st, 2018) twice
    clickFirstDate(wrapper)
    clickFirstDate(wrapper)

    expect(wrapper.find('#selectedDays').text()).toEqual('No dates selected')
  })
})
