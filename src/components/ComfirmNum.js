import React, { Component } from 'react'
import { logDebug, logError } from '../utils/logger'
import http from 'http'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { matchPropTypes } from '../components/Title'

const apiHost = process.env.CONNECTION_STRING

class ComfirmNum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comfirmNumber: '',
    }
  }

  getEmailConfirm(documentId) {
    var comfirm = ''
    console.log(documentId)
    let data = ''
    http.get(`${apiHost}/appointments/confirm/${documentId}`, resp => {
      logDebug(`STATUS: ${resp.statusCode}`)
      logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
      resp.on('data', chunk => {
        data += chunk
      })
      resp.on('end', function() {
        data = JSON.parse(data)

        console.log('here1')
        console.log(data.confirmation)
        console.log('here1')
        comfirm = data.confirmation

        // eslint-disable-next-line no-console
        console.log(data)
        // eslint-disable-next-line no-console
        console.log(comfirm)

        return this.handle(comfirm)
      })
    })
  }

  render() {
    let {
      context: {
        store: {
          register: {
            paperFileNumber,
            email,
            accessibility,
            // hashFromData,
          } = {},
          calendar: {
            selectedDays = [],
            selectedTime,
            tempAppointment: { _id } = {},
          } = {},
          selectProvince: { locationCity, locationAddress } = {},
        } = {},
      } = {},
    } = this.props
    // eslint-disable-next-line no-console
    console.log(_id)

    this.getEmailConfirm(_id)
    // eslint-disable-next-line no-console
    console.log(this.state.comfirmNumber)

    return <span>{'comfirmNum'}</span>
  }
}

ComfirmNum.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(ComfirmNum)
