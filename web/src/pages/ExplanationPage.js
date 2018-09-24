import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans } from '@lingui/react'
import { css } from 'react-emotion'
import {
  theme,
  visuallyhidden,
  mediaQuery,
  BottomContainer,
  focusRing,
  contentClass,
} from '../styles'
import {
  ExplanationFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'
import { NavLink } from 'react-router-dom'
import Validator from 'validatorjs'
import { trimInput } from '../utils/cleanInput'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import { TextAreaAdapter } from '../components/forms/TextInput'
import Button from '../components/forms/Button'
import { ValidationMessage } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import CancelButton from '../components/CancelButton'
import { windowExists } from '../utils/windowExists'
import { checkURLParams } from '../utils/url'
import Chevron from '../components/Chevron'

const explanationContentClass = css`
  width: 80%;
  ${mediaQuery.md(css`
    width: 100%;
    textarea[id='explanationPage'] {
      width: 100%;
    }
  `)};
  p {
    margin-bottom: ${theme.spacing.lg};
  }
  ${contentClass};

  .nav-link-top {
    display: inline-block;
    margin-bottom: ${theme.spacing.lg};
  }

  .back {
    cursor: pointer;
  }
`

const beforeErrorStyles = css`
  margin-bottom: 0 !important;
  ${focusRing};

  > span:not(.empty) {
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.font.lg};
  }
`

const afterErrorStyles = css`
  border: solid 2px red;
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg} !important;
  ${focusRing};
  h2 {
    margin-top: 0 !important;
  }
`

class ExplanationPage extends React.Component {
  static errStrings = {}

  static get fields() {
    return getFieldNames(ExplanationFields)
  }

  static redirect() {
    return '/review'
  }

  static validate(values, submitted) {
    if (submitted || !windowExists()) {
      const validate = new Validator(
        trimInput(values),
        ExplanationFields,
        defaultMessages,
      )

      if (validate.passes()) {
        ExplanationPage.errStrings = {}
        return ExplanationPage.errStrings
      }

      ExplanationPage.errStrings = getFieldErrorStrings(validate)
    }

    return ExplanationPage.errStrings
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = ExplanationPage.validate
    this.fields = ExplanationPage.fields
    this.redirect = ExplanationPage.redirect
    this.hasNotValid = this.hasNotValid.bind(this)
    this.generalErrorMessage = this.generalErrorMessage.bind(this)
    this.form = null
  }

  generalErrorMessage() {
    return <Trans>Some information is missing.</Trans>
  }

  /*
  Check if the form was redirected from the server
  */

  hasNotValid() {
    return this.props.location.search.indexOf('not-valid') !== -1
  }

  async onSubmit(values, event) {
    const submitErrors = this.validate(values, true)
    if (windowExists()) {
      window.scrollTo(0, this.errorContainer.offsetTop - 20)
    }
    this.errorContainer.focus()

    if (Object.keys(submitErrors).length) {
      const generalMessage = this.generalErrorMessage()

      return {
        [FORM_ERROR]: generalMessage,
      }
    }

    // if setStore doesn't exist, nothing gets saved between pages
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push(this.redirect())
  }

  render() {
    let { context: { store: { explanation = {} } = {} } = {} } = this.props
    let errorsNoJS = {}

    // only run this if there's a location.search
    // AND at least one of our fields exists in the url keys somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      this.props.location.search &&
      this.props.location.pathname === '/explanation' &&
      checkURLParams(this.props.location.search, this.fields)
    ) {
      errorsNoJS = this.validate(explanation, true)
    }

    return (
      <Layout contentClass={explanationContentClass}>
        <Title path={this.props.match.path} />
        <NavLink
          className="chevron-link nav-link-top"
          to={explanation.explanationPage ? '/register' : '/calendar'}
        >
          <Chevron dir="left" />
          <Trans>Go back</Trans>
        </NavLink>
        <h1 className={visuallyhidden}>
          <Trans>Apply for an appointment extension</Trans>
        </h1>
        <p>
          <Trans>
            If you cannot attend an appointment on any of the available days,
            staff may not be able to accommodate your request to reschedule.
          </Trans>
        </p>
        <p>
          <Trans>
            Our policy is to delay appointments a maximum of two months. We’ll
            review your request and determine if we can accommodate your
            unavailability and get back to you within 1 week.
          </Trans>
        </p>
        <Form
          onSubmit={this.onSubmit}
          initialValues={explanation || {}}
          render={({ handleSubmit, submitError, submitting, values }) => {
            const notValid = this.hasNotValid()
            const generalMessage = this.generalErrorMessage()

            submitError =
              Object.keys(errorsNoJS).length && !submitError
                ? generalMessage
                : submitError
            return (
              <form
                id="explanation-form"
                ref={el => {
                  if (!this.form && notValid) {
                    this.form = el
                    el.dispatchEvent(new Event('submit')) // eslint-disable-line no-undef
                  }
                }}
                onSubmit={handleSubmit}
              >
                <div
                  id="submit-error"
                  className={submitError ? afterErrorStyles : beforeErrorStyles}
                  tabIndex="-1"
                  ref={errorContainer => {
                    this.errorContainer = errorContainer
                  }}
                >
                  <h2>{submitError}</h2>
                </div>
                <div>
                  <Field
                    name="explanationPage"
                    id="explanationPage"
                    component={TextAreaAdapter}
                    aria-labelledby="explanationPage-label explanationPage-error"
                  >
                    <label htmlFor="explanationPage" id="explanationPage-label">
                      <span id="explanationPage-header">
                        <Trans>When are you unavailable?</Trans>
                      </span>
                      <ValidationMessage
                        id="explanationPage-error"
                        message={
                          submitError && this.validate(values).explanationPage
                            ? this.validate(values).explanationPage
                            : ''
                        }
                      />
                      <span id="explanationPage-details">
                        <Trans>
                          If you haven’t already, please provide a reason for
                          your unavailability.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                {/*
               Button is disabled if form has been submitted (and is waiting)
              */}
                <BottomContainer>
                  <Button
                    onClick={() => {
                      this.setState({ submitClicked: true })
                    }}
                    disabled={submitting}
                  >
                    <Trans>Continue</Trans>
                  </Button>

                  <CancelButton />
                </BottomContainer>
              </form>
            )
          }}
        />
      </Layout>
    )
  }
}
ExplanationPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withContext(ExplanationPage)
