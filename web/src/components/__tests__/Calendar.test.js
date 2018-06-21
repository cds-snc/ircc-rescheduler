import React from 'react'
import { mount } from 'enzyme'
import CalendarAdapter from '../Calendar'

const clickDate = (wrapper, index) => {
  return wrapper
    .find('.DayPicker-Day[aria-disabled=false]')
    .at(index)
    .simulate('click')
}

const clickFirstDate = wrapper => {
  return clickDate(wrapper, 0)
}

const getDateStrings = wrapper => {
  return wrapper
    .find('#selectedDays time')
    .map(time => time.text())
    .join(' ')
}

const getErrorMessageString = wrapper => {
  return wrapper
    .find('#selectedDays-error')
    .first()
    .text()
}

const defaultProps = ({ value = '', dayLimit = 3 } = {}) => {
  return {
    input: { value: value, onChange: () => {} },
    dayLimit: dayLimit,
  }
}

describe('<CalendarAdapter />', () => {
  it('renders July 2018', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.text()).toMatch(/July 2018/)
  })

  it('renders August 2018', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    wrapper.find('.DayPicker-NavButton--next').simulate('click')
    expect(wrapper.text()).toMatch(/August 2018/)
    expect(wrapper.text()).not.toMatch(/July 2018/)
  })

  it('renders September 2018', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    wrapper.find('.DayPicker-NavButton--next').simulate('click')
    wrapper.find('.DayPicker-NavButton--next').simulate('click')
    expect(wrapper.text()).toMatch(/September 2018/)
    expect(wrapper.text()).not.toMatch(/August 2018/)
  })

  it('will prefill a date if an initial value is provided', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({ value: [new Date('2018-07-17T12:00:00.000')] })}
      />,
    )

    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018')
  })

  it('will prefill multiple dates if multiple initial values are provided', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [
            new Date('2018-07-17T12:00:00.000'),
            new Date('2018-07-20T12:00:00.000'),
          ],
        })}
      />,
    )

    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018 Fri, Jul 20, 2018')
  })

  it('selects a date when it is clicked', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018')
  })

  it('orders selected dates chronologically', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click July 24th, 2018
    clickDate(wrapper, 2)
    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 24, 2018')

    // click July 20th, 2018
    clickDate(wrapper, 1)
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018 Tue, Jul 24, 2018')

    // click July 17th, 2018
    clickDate(wrapper, 0)

    expect(getDateStrings(wrapper)).toEqual(
      'Tue, Jul 17, 2018 Fri, Jul 20, 2018 Tue, Jul 24, 2018',
    )
  })

  it('unselects a date when it is clicked twice', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)

    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click the first available day (July 17th, 2018) twice
    clickFirstDate(wrapper)
    clickFirstDate(wrapper)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
  })

  it('will not select more days once the limit is reached', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date('2018-07-20T12:00:00.000')],
          dayLimit: 1,
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018')

    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018')
    expect(getErrorMessageString(wrapper)).toEqual(
      'You have already selected the maximum number of dates!',
    )
  })

  it('will remove maximum date error message if a date is unselected', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date('2018-07-20T12:00:00.000')],
          dayLimit: 1,
        })}
      />,
    )
    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018')
    expect(getErrorMessageString(wrapper)).toEqual(
      'You have already selected the maximum number of dates!',
    )

    // click first "Remove date" button
    wrapper
      .find('#selectedDays button')
      .first()
      .simulate('click')
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
    expect(getErrorMessageString(wrapper)).toEqual('')
  })

  it('will allow more days to be selected once a day is unselected', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date('2018-07-20T12:00:00.000')],
          dayLimit: 1,
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018')

    // click July 20th, 2018
    clickDate(wrapper, 1)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018')
  })

  it('will keep pre-filled dates when clicking new ones', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [
            new Date('2018-07-20T12:00:00.000'),
            new Date('2018-07-24T12:00:00.000'),
          ],
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018 Tue, Jul 24, 2018')

    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(
      'Tue, Jul 17, 2018 Fri, Jul 20, 2018 Tue, Jul 24, 2018',
    )
  })

  it('will un-click pre-filled dates when clicking new ones', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [
            new Date('2018-07-17T12:00:00.000'),
            new Date('2018-07-20T12:00:00.000'),
          ],
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018 Fri, Jul 20, 2018')

    // click the first available day (July 17th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual('Fri, Jul 20, 2018')
  })

  const events = [
    { eventType: 'click', options: {}, toString: 'click event' },
    {
      eventType: 'keypress',
      options: { key: ' ' },
      toString: 'keypress event with spacebar',
    },
    {
      eventType: 'keypress',
      options: { key: 'Enter' },
      toString: 'keypress event with enter key',
    },
  ]

  events.map(({ eventType, options, toString }) => {
    it(`will remove a date when its "Remove date" button is triggered by a ${toString}`, () => {
      const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
      expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

      clickFirstDate(wrapper)
      expect(getDateStrings(wrapper)).toEqual('Tue, Jul 17, 2018')

      wrapper
        .find('#selectedDays button')
        .first()
        .simulate(eventType, options)
      expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
    })
  })
})
