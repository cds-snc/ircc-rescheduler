import React, { Component } from 'react'
import { contextPropTypes } from '../context'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import SelectDropDown from '../components/forms/Select'
import { css } from 'emotion'

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

  componentDidUpdate() {
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
          optData={this.props.timeSlots}
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
