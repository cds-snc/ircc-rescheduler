/* eslint-disable no-console */
import React, { Component } from 'react'
import TimeForm from './TimeForm'
import { contextPropTypes } from '../context'
// import PropTypes from 'prop-types'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import moment from 'moment'

class TimeSlots extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: 0,
      appointments: [],
      selectedDay: [],
    }
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillReceiveProps() {
    let {
      context: {
        store: {
          selectProvince: { locationId, locationBiokitNumber } = {},
        } = {},
      } = {},
    } = this.props

    console.log('this is the componentdidmount ')

    var d = new moment(this.props.selectedDay[0])

    var newDate = moment(d).format('DD-MM-YYYY')

    console.log(newDate)

    // const day = d.date()
    // const year = d.year().toString()
    // const month1 = d.month() + 1
    // const month = month1.toString()

    // const newDate = day + '-' + month + '-' + year
    // console.log(newDate)

    // console.log(locationBiokitNumber)
    // console.log(currentDate)
    // console.log(locationId)
    // console.log(this.props)

    // const url = `http://localhost:4011/appointmentsByLocId/${locationId}`
    const url = `http://localhost:4011/appointmentss/${locationId}/${newDate}`

    // eslint-disable-next-line no-undef
    console.log(url)

    // eslint-disable-next-line no-undef
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ appointments: data, loading: true })
    // eslint-disable-next-line no-console
    // this.removeTimeSlot()
  }

  removeTimeSlot(mockData) {
    const dbTimeSlots = this.state.appointments
    const TimeSlotArray = mockData
    // eslint-disable-next-line no-console
    // console.log(TimeSlotArray[1].Time)
    // eslint-disable-next-line no-console
    // console.log(dbTimeSlots)

    for (var i = 0; i < TimeSlotArray.length; i++) {
      for (var j = 0; j < dbTimeSlots.length; j++) {
        // eslint-disable-next-line security/detect-object-injection
        if (
          dbTimeSlots[j].time.toString() ===
          // eslint-disable-next-line security/detect-object-injection
          TimeSlotArray[i].Time.toString()
        ) {
          // eslint-disable-next-line no-console
          //  console.log('its true');
          TimeSlotArray.splice(i, 1)
        }
        // eslint-disable-next-line no-console
        //  console.log('its false');
      }
    }

    // const NewTimeSlotArray = TimeSlotArray
    // eslint-disable-next-line no-console
    console.log(TimeSlotArray)

    // eslint-disable-next-line no-console
    return TimeSlotArray
  }

  changeHandler = id => {
    this.setState({
      selectedId: id,
    })
    // eslint-disable-next-line react/prop-types
    this.props.selectedTimeId(id)
    // eslint-disable-next-line no-undef
    // console.log(id)
    // console.log(this.props)
  }

  daySelected = selectedDay => {
    this.props.selectedDay(selectedDay)
    // eslint-disable-next-line no-console
    // console.log(this.props.selectedDay)
    this.setState({
      selectedDay: selectedDay,
    })
  }

  getTimeStops(start, end) {
    var startTime = moment(start, 'hh:mm')
    var endTime = moment(end, 'hh:mm')

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day')
    }

    var timeStops = []

    var index = 0

    while (startTime <= endTime) {
      ++index
      timeStops.push({
        id: index,
        Time: new moment(startTime).format('hh:mm a'),
      })
      startTime.add(15, 'minutes')
    }

    return timeStops
  }

  render() {
    let {
      context: { store: { selectProvince: { locationHours } = {} } = {} } = {},
    } = this.props

    var str = locationHours,
      array = str.split('-')

    ;(function timeSplit(a, b) {
      a
      b
    }.apply(null, array))

    const start = array[0]
    const end = array[1]

    const mockData = this.getTimeStops(start, end)
    const timeSlot = this.removeTimeSlot(mockData)

    return (
      <div>
        <table>
          <tbody>
            {timeSlot.map(rowData => (
              <TimeForm
                key={rowData.id}
                selectedId={this.state.selectedId}
                rowData={rowData}
                onSelect={this.changeHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(TimeSlots)
