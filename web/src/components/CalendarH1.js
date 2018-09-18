import React, { Component } from 'react'
import { Trans } from '@lingui/react'
import { getEndMonthName, getStartMonthName } from '../utils/calendarDates'
import PropTypes from 'prop-types'
class CalendarH1 extends Component {
  render() {
    const { familyOption, locale } = this.props
    return (
      <React.Fragment>
        <Trans>Select</Trans>{' '}
        <strong>
          <Trans>3 days</Trans>
        </strong>{' '}
        {familyOption ? (
          <Trans>you and your family are available between</Trans>
        ) : (
          <Trans>you’re available between</Trans>
        )}{' '}
        {getStartMonthName(new Date(), locale)} <Trans>and</Trans>{' '}
        {getEndMonthName(new Date(), locale)}.
      </React.Fragment>
    )
  }
}

CalendarH1.propTypes = {
  familyOption: PropTypes.string,
  locale: PropTypes.string.isRequired,
}

export default CalendarH1
