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
    let msg = `Select 3 days ${familyOptionText} available between ${startMonthName} and ${endMonthName}`

    //fr
    if (locale === 'fr') {
      let familyOptionText = familyOption
        ? 'où vous et votre famille serez disponibles.'
        : 'vous serez disponibles.'
      msg = `Sélectionnez 3 jours entre le ${startMonthName} et le ${endMonthName} ${familyOptionText}`
    }

    return <React.Fragment>{msg}</React.Fragment>
  }
}

CalendarH1.propTypes = {
  familyOption: PropTypes.string,
  locale: PropTypes.string.isRequired,
}

export default CalendarH1
