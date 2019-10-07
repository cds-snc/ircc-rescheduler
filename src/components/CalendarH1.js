import React, { Component } from 'react'
import { getEndMonthName, getStartMonthName } from '../utils/calendarDates'
import PropTypes from 'prop-types'
class CalendarH1 extends Component {
  render() {
    const { locale } = this.props
    const startMonthName = getStartMonthName(new Date(), locale)
    const endMonthName = getEndMonthName(new Date(), locale)

    // en
    let msg = `Select a day you’re available between ${startMonthName} and ${endMonthName}`

    //fr
    if (locale === 'fr') {
      msg = `Sélectionnez 1 jour entre ${startMonthName} et ${endMonthName} quand vous serez disponibles.`
    }

    return <React.Fragment>{msg}</React.Fragment>
  }
}

CalendarH1.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default CalendarH1
