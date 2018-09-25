import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import { Trans } from '@lingui/react'
import Layout from '../components/Layout'
import { matchPropTypes } from '../components/Title'
import Button from '../components/forms/Button'
import { ErrorList } from '../components/ErrorMessage'
import CalendarNoJS from '../components/CalendarNoJS'
import { Checkbox } from '../components/forms/MultipleChoice'
import { checkURLParams } from '../utils/url'
import { CalHeader } from './calendar/CalHeader'
import { CalBottom } from './calendar/CalBottom'
import { css } from 'react-emotion'

const fullWidth = css`
  width: 100% !important;
`

export default class CalendarPageNoJS extends Component {
  static get fields() {
    return ['selectedDays']
  }

  static get redirect() {
    return '/review'
  }

  static validate(values) {
    if (values && values.selectedDays && values.selectedDays.length === 3) {
      return {}
    }
    return {
      selectedDays: <Trans>You must select 3 days.</Trans>,
    }
  }

  constructor(props) {
    super(props)
    this.hasNotValid = this.hasNotValid.bind(this)
  }

  hasNotValid() {
    return this.props.location.search.indexOf('not-valid') !== -1
  }

  render() {
    let {
      context: { store: { calendar = {}, language: locale = 'en' } = {} } = {},
    } = this.props
    let errorsNoJS = {}

    // only run this if there's a location.search
    // AND at least one of our fields exists in the url keys somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      (this.props.location.search &&
        this.props.location.pathname === '/calendar' &&
        checkURLParams(this.props.location.search, CalendarPageNoJS.fields)) ||
      this.hasNotValid()
    ) {
      errorsNoJS = CalendarPageNoJS.validate(calendar)
    }

    return (
      <Layout>
        <CalHeader locale={locale} path={this.props.match.path} />
        {Object.keys(errorsNoJS).length ? (
          <ErrorList message={errorsNoJS.selectedDays}>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href="#selectedDays-form">Calendar</a>
          </ErrorList>
        ) : null}
        {/*
          the first checkbox / radio on the page doesn't have its CSS applied correctly
          so this is a dummy checkbox that nobody should ever see
          it's also outside of the form so it can't be submitted
          if it is removed, the first checkbox in the list of dates will disappear
        */}
        <div style={{ display: 'none' }}>
          <Checkbox id="ignore-me" value="ignore-me" />
        </div>
        <form id="selectedDays-form" className={fullWidth}>
          {/* <input type="hidden" name="explanationPage" value="" /> */}
          <span>
            <CalendarNoJS dates={calendar} locale={locale} />
            <CalBottom
              submit={() => {
                return (
                  <Button>
                    <Trans>Review request</Trans>
                  </Button>
                )
              }}
            />
          </span>
        </form>
      </Layout>
    )
  }
}
CalendarPageNoJS.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  location: PropTypes.object,
}
