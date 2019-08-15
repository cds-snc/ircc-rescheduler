import React, { Component } from 'react'
import { getEndMonthName, getStartMonthName } from '../utils/calendarDates'
import PropTypes from 'prop-types'
class CalendarH1 extends Component {
  render() {
    const { familyOption, locale } = this.props
    const startMonthName = getStartMonthName(new Date(), locale)
    const endMonthName = getEndMonthName(new Date(), locale)

    // en
    let familyOptionText = familyOption ? 'you and your family are' : 'you’re'
    let msg = `Select 1 day ${familyOptionText} available between ${startMonthName} and ${endMonthName}`

    //fr
    if (locale === 'fr') {
      let familyOptionText = familyOption
        ? 'où vous et votre famille serez disponibles.'
        : 'quand vous serez disponibles.'
      msg = `Sélectionnez 1 jour entre ${startMonthName} et ${endMonthName} ${familyOptionText}`
    }

    return <React.Fragment>{msg}</React.Fragment>
  }
}

CalendarH1.propTypes = {
  familyOption: PropTypes.string,
  locale: PropTypes.string.isRequired,
}

export default CalendarH1
