import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import moment from 'moment'
import SelectDropDown from '../components/forms/Select'
import { css } from 'emotion'
import axios from 'axios'
import { logError } from '../utils/logger'

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
      timeSlots: [],
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.getNewestTimeslots = this.getNewestTimeslots.bind(this)
  }

  async UNSAFE_componentWillReceiveProps() {
    let {
      context: {
        store: {
          // eslint-disable-next-line no-unused-vars
          selectProvince: { locationId, locationBiokitNumber } = {},
        } = {},
      } = {},
    } = this.props
  }

  changeHandler(event) {
    // event.preventDefault()
    this.setState({ selectedId: event.target.value })
    this.props.selectedTimeId(event.target.value)
  }

  getNewestTimeslots() {
    let userSelection = this.props.context.store.register.accessibility
    let accessible = true
    if (!userSelection || userSelection[0] === undefined) {
      accessible = false
    }
    let locationId = this.props.context.store.selectProvince.locationId
    let selectedDay = moment(this.props.selectedDay[0]).format('YYYY-MM-DD')
    let values = {
      ...this.props.context.store.calendar,
    }
    axios
      .get(
        `/appointments/timeslots/${locationId}?day=${selectedDay}&accessible=${accessible}`,
      )
      .then(async resp => {
        let timeSlots = resp.data
        values = {
          ...values,
          timeSlots,
        }
        this.setState({ timeSlots: timeSlots })
        await this.props.context.setStore('calendar', values)
      })
      .catch(err => {
        logError(err)
      })
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
    return (
      <div id="select-time" className={selectDropDown}>
        <SelectDropDown
          selName="TimeSlot"
          selId="TimeSlot"
          optName1="Select a time"
          selOnChange={this.changeHandler}
          selOnClick={this.getNewestTimeslots}
          optData={this.state.timeSlots}
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
