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
} from '../styles'
import {
  RegistrationFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'
import Validator from 'validatorjs'
import { trimInput, deleteEmptyArrayKeys } from '../utils/cleanInput'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import {
  TextFieldAdapter,
  TextAreaAdapter,
} from '../components/forms/TextInput'
import FieldSet from '../components/forms/FieldSet'
import {
  Radio,
  RadioAdapter,
  CheckboxAdapter,
} from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { ValidationMessage, ErrorList } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import CancelButton from '../components/CancelButton'
import { HashLink } from 'react-router-hash-link'
import { windowExists } from '../utils/windowExists'
import { checkURLParams } from '../utils/url'
import { trackRegistrationErrors } from '../utils/analytics'

const contentClass = css`
  form {
    > div {
      margin-bottom: ${theme.spacing.xl};
    }

    > p {
      margin-bottom: ${theme.spacing.sm};

      ${mediaQuery.sm(css`
        margin-bottom: ${theme.spacing.md};
      `)};
    }

    h2 {
      margin-top: 0rem;
    }

    /* all this CSS is for the new checkbox + family textarea */
    input[type='checkbox'] + label::before {
      border: 3px solid ${theme.colour.black};
      background-color: ${theme.colour.white};
    }

    textarea[name='familyOption'] {
      height: 5.3em;
    }

    textarea[disabled] {
      background: ${theme.colour.greyLight};
      border: 3px solid #a4a4a4;
      cursor: not-allowed;
    }

    label[for='familyCheck'] {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    input[name='paperFileNumber'] {
      margin-bottom: ${theme.spacing.sm};
    }

    label,
    legend {
      display: block;
      margin-bottom: ${theme.spacing.sm};

      > span {
        margin-bottom: ${theme.spacing.xxs};
        display: block;

        &[id$='-header'] {
          font-size: ${theme.font.lg};
          font-weight: 700;
        }
      }
    }
  }
`

const forNowSubmitErrorStyles = css`
  margin-bottom: 0 !important;

  ${focusRing};

  > span:not(.empty) {
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.font.lg};
  }
`

const labelNames = id => {
  switch (id) {
    case 'fullName':
      return <Trans>Full name</Trans>
    case 'email':
      return <Trans>Email address</Trans>
    case 'paperFileNumber':
      return <Trans>Paper file number</Trans>
    case 'reason':
      return <Trans>Why are you rescheduling?</Trans>
    case 'explanation':
      return <Trans>Describe why you can’t attend your appointment</Trans>
    case 'familyOption':
      return <Trans>Family Option</Trans>
    default:
      return ''
  }
}

class RegistrationPage extends React.Component {
  static errStrings = {}

  static get fields() {
    return getFieldNames(RegistrationFields)
  }

  static get redirect() {
    return '/calendar'
  }

  static validate(values, submitted) {
    deleteEmptyArrayKeys(values)
    if (submitted || !windowExists()) {
      const validate = new Validator(
        trimInput(values),
        RegistrationFields,
        defaultMessages,
      )

      if (validate.passes()) {
        RegistrationPage.errStrings = {}
        return RegistrationPage.errStrings
      }

      RegistrationPage.errStrings = getFieldErrorStrings(validate)
    }

    return RegistrationPage.errStrings
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = RegistrationPage.validate
    this.fields = RegistrationPage.fields
    this.redirect = RegistrationPage.redirect
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

    if (Object.keys(submitErrors).length) {
      const generalMessage = this.generalErrorMessage()

      if (windowExists()) {
        window.scrollTo(0, this.errorContainer.offsetTop - 20)
      }
      this.errorContainer.focus()

      trackRegistrationErrors(submitErrors)

      return {
        [FORM_ERROR]: generalMessage,
      }
    }

    // if setStore doesn't exist, nothing gets saved between pages
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push(this.redirect)
  }

  render() {
    let { context: { store: { register = {} } = {} } = {} } = this.props
    let errorsNoJS = {}

    // only run this if there's a location.search
    // AND at least one of our fields exists in the url keys somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      this.props.location.search &&
      this.props.location.pathname === '/register' &&
      checkURLParams(this.props.location.search, this.fields)
    ) {
      errorsNoJS = this.validate(register, true)
    }

    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <h1 className={visuallyhidden}>
          <Trans>First, provide some basic information:</Trans>
        </h1>
        {/*
          the first checkbox / radio on the page doesn't have its CSS applied correctly
          so this is a dummy radio button that nobody should ever see
          it's also outside of the form so it can't be submitted
          if it is removed, the first radio button in the list of reasons will disappear
        */}
        <div style={{ display: 'none' }}>
          <Radio id="ignore-me" value="ignore-me" />
        </div>
        <Form
          onSubmit={this.onSubmit}
          initialValues={register || {}}
          render={({ handleSubmit, submitError, submitting, values }) => {
            const notValid = this.hasNotValid()
            const generalMessage = this.generalErrorMessage()
            let { familyCheck = [] } = values

            submitError =
              Object.keys(errorsNoJS).length && !submitError
                ? generalMessage
                : submitError
            return (
              <form
                id="register-form"
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
                  className={forNowSubmitErrorStyles}
                  tabIndex="-1"
                  ref={errorContainer => {
                    this.errorContainer = errorContainer
                  }}
                >
                  <ErrorList message={submitError || ''}>
                    {Object.keys(this.validate(values)).map((formId, i) => (
                      <HashLink
                        to={
                          formId === 'reason'
                            ? '#reason-header'
                            : `#${formId}-label`
                        }
                        key={i}
                      >
                        {labelNames(formId) ? labelNames(formId) : formId}
                        <br />
                      </HashLink>
                    ))}
                  </ErrorList>
                </div>

                <div>
                  <Field
                    component={TextFieldAdapter}
                    name="fullName"
                    id="fullName"
                  >
                    <label htmlFor="fullName" id="fullName-label">
                      <span id="fullName-header">
                        {}
                        <Trans>Full name</Trans>
                      </span>
                      <ValidationMessage
                        id="fullName-error"
                        message={
                          submitError && this.validate(values).fullName
                            ? this.validate(values).fullName
                            : ''
                        }
                      />
                      <span id="fullName-details">
                        <Trans>
                          This is the full name you used on your citizenship
                          application.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                <div>
                  <Field
                    component={TextFieldAdapter}
                    name="paperFileNumber"
                    id="paperFileNumber"
                  >
                    <label htmlFor="paperFileNumber" id="paperFileNumber-label">
                      <span id="paperFileNumber-header">
                        <Trans>Paper file number</Trans>
                      </span>
                      <ValidationMessage
                        id="paperFileNumber-error"
                        message={
                          submitError && this.validate(values).paperFileNumber
                            ? this.validate(values).paperFileNumber
                            : ''
                        }
                      />
                      <span id="paperFileNumber-details">
                        <Trans>
                          This number is at the top of the email attachment we
                          sent you.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                <div>
                  <Field
                    name="familyOption"
                    id="familyOption"
                    component={TextAreaAdapter}
                    disabled={!familyCheck.length}
                  >
                    <label htmlFor="familyOption" id="familyOption-label">
                      <Field
                        type="checkbox"
                        component={CheckboxAdapter}
                        name="familyCheck"
                        id="familyCheck"
                        label={
                          <Trans>I need to reschedule my family too</Trans>
                        }
                        value="familyCheck"
                      />
                      <ValidationMessage
                        id="familyOption-error"
                        message={
                          submitError && this.validate(values).familyOption
                            ? this.validate(values).familyOption
                            : ''
                        }
                      />
                      <span id="familyOption-details">
                        <Trans>
                          Provide the full name of each family member you want
                          to reschedule.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                <div>
                  <Field component={TextFieldAdapter} name="email" id="email">
                    <label htmlFor="email" id="email-label">
                      <span id="email-header">
                        <Trans>Email address</Trans>
                      </span>
                      <ValidationMessage
                        id="email-error"
                        message={
                          submitError && this.validate(values).email
                            ? this.validate(values).email
                            : ''
                        }
                      />
                      <span id="email-details">
                        <Trans>
                          This is where we’ll send a confirmation email when
                          you’re done.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                <div>
                  <FieldSet legendHidden={false} id="reason">
                    <legend>
                      <span id="reason-header">{labelNames('reason')}</span>
                      <ValidationMessage
                        id="reason-error"
                        message={
                          submitError && this.validate(values).reason
                            ? this.validate(values).reason
                            : ''
                        }
                      />
                    </legend>

                    <Field
                      type="radio"
                      component={RadioAdapter}
                      label={<Trans>Travel (business or vacation)</Trans>}
                      value="travel"
                      name="reason"
                      id="reason-0"
                    />
                    <Field
                      type="radio"
                      component={RadioAdapter}
                      label={<Trans>Medical</Trans>}
                      value="medical"
                      name="reason"
                      id="reason-1"
                    />
                    <Field
                      type="radio"
                      component={RadioAdapter}
                      label={<Trans>Work or school</Trans>}
                      value="workOrSchool"
                      name="reason"
                      id="reason-2"
                    />
                    <Field
                      type="radio"
                      component={RadioAdapter}
                      label={<Trans>Family</Trans>}
                      value="family"
                      name="reason"
                      id="reason-3"
                    />
                    <Field
                      type="radio"
                      component={RadioAdapter}
                      label={<Trans>Other</Trans>}
                      value="other"
                      name="reason"
                      id="reason-4"
                    />
                  </FieldSet>
                </div>
                <div>
                  <Field
                    name="explanation"
                    id="explanation"
                    component={TextAreaAdapter}
                    aria-labelledby="explanation-label explanation-error"
                  >
                    <label htmlFor="explanation" id="explanation-label">
                      <span id="explanation-header">
                        <Trans>
                          Describe why you can’t attend your appointment
                        </Trans>
                      </span>
                      <ValidationMessage
                        id="explanation-error"
                        message={
                          submitError && this.validate(values).explanation
                            ? this.validate(values).explanation
                            : ''
                        }
                      />
                      <span id="explanation-details">
                        <Trans>
                          Provide enough detail so that staff can understand
                          your situation.
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
RegistrationPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withContext(RegistrationPage)
