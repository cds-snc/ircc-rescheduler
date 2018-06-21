import React from 'react'
import { shallow } from 'enzyme'
import Time, { dateToISODateString } from '../Time'

describe('<Time />', () => {
  let dateString = 'Fri, Apr 22, 1870'
  let date = new Date(dateString)

  it('renders a <time> element', () => {
    const time = shallow(<Time date={date} locale={'en'}/>)
    expect(time.find('time').length).toEqual(1)
  })

  it('renders correctly from a Date object in french format', () => {
    const time = shallow(<Time date={date} locale={'fr'}/>)
    expect(time.props().dateTime).toEqual('1870-04-22')
    expect(time.text()).toEqual('ven. 22 avr. 1870')
  })

  it('renders correctly from a date string', () => {
    const time = shallow(<Time date={dateString} locale={'en'}/>)
    expect(time.props().dateTime).toEqual('1870-04-22')
    expect(time.text()).toEqual('Fri, Apr 22, 1870')
  })
})

describe('dateToISODateString returns a correctly-formatted ISO date string', () => {
  let dateStrings = {
    'Fri Apr 22 1870': '1870-04-22',
    'Wed Nov 07 1917': '1917-11-07',
    'Sun Jan 02 2000': '2000-01-02',
    'Fri Dec 31 1999': '1999-12-31',
  }

  it('from a string', () => {
    Object.entries(dateStrings).map(strings => {
      expect(dateToISODateString(strings[0])).toEqual(strings[1])
    })
  })

  it('from a Date object', () => {
    Object.entries(dateStrings).map(strings => {
      expect(dateToISODateString(new Date(strings[0]))).toEqual(strings[1])
    })
  })
})
