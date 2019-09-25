import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import moment from 'moment'
import SelectDropDown from '../components/forms/Select'
import { css } from 'emotion'
import axios from 'axios'

const selectDropDown = css`
  max-width: 500px;
`

class TimeSlots extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: 0,
      appointments: [],
      selectedDay: [],
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  async componentWillReceiveProps() {
    let {
      context: {
        store: {
          // eslint-disable-next-line no-unused-vars
          selectProvince: { locationId, locationBiokitNumber } = {},
        } = {},
      } = {},
    } = this.props
  }

  removeTimeSlot(mockData) {
    const dbTimeSlots = this.state.appointments
    const TimeSlotArray = mockData

    for (var i = 0; i < TimeSlotArray.length; i++) {
      for (var j = 0; j < dbTimeSlots.length; j++) {
        if (
          // eslint-disable-next-line security/detect-object-injection
          dbTimeSlots[j].time.toString() ===
          // eslint-disable-next-line security/detect-object-injection
          TimeSlotArray[i].name.toString()
        ) {
          TimeSlotArray.splice(i, 1)
        }
      }
    }

    return TimeSlotArray
  }

  changeHandler(event) {
    // event.preventDefault()
    this.setState({ selectedId: event.target.value })
    this.props.selectedTimeId(event.target.value)
  }

  getTimeStops(start, end) {
    var startTime = moment(start, 'hh:mm')
    var endTime = moment(end, 'hh:mm')

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day')
    }

    var timeStops = []

    while (startTime <= endTime) {
      timeStops.push({
        value: new moment(startTime).format('hh:mm a'),
        name: new moment(startTime).format('hh:mm a'),
      })
      startTime.add(15, 'minutes')
    }

    return timeStops
  }

  splitTheString(CommaSepStr) {
    var ResultArray = null

    if (CommaSepStr != null) {
      var SplitChars = '-'
      if (CommaSepStr.indexOf(SplitChars) >= 0) {
        ResultArray = CommaSepStr.split(SplitChars)
      }
    }
    return ResultArray
  }

  render() {
    let {
      context: { store: { selectProvince: { locationHours } = {} } = {} } = {},
    } = this.props

    if (!locationHours) {
      locationHours = '0:00-00:00'
    }

    const openingHour = this.splitTheString(locationHours)

    const start = openingHour[0]
    const end = openingHour[1]

    const mockData = this.getTimeStops(start, end)
    const timeSlot = this.removeTimeSlot(mockData)

    return (
      <div id='select-time' className={selectDropDown}>
        <SelectDropDown
          selName="TimeSlot"
          selId="TimeSlot"
          optName1="Select a time"
          selOnChange={this.changeHandler}
          optData={timeSlot}
        />
      </div>
    )
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(TimeSlots)
