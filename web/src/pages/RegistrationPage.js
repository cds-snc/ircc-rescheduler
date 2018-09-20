import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans, withI18n } from '@lingui/react'
import { css } from 'react-emotion'
import {
  theme,
  visuallyhidden,
  BottomContainer,
  focusRing,
  contentClass,
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
import FocusedH1 from '../components/FocusedH1'

const registrationContentClass = css`
  ${contentClass};

  input[name='paperFileNumber'] {
    margin-bottom: ${theme.spacing.sm};
  }

  input#familyCheck + label::before {
    border-width: 3px;
  }

  #familyCheck-error {
    margin-bottom: ${theme.spacing.sm};
  }

  label[for='familyCheck'],
  label[for='familyOption'] {
    display: inline-block;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  textarea[name='familyOption'] {
    height: 5.3em;
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
    case 'familyCheck':
      return <Trans>Reschedule family members</Trans>
    case 'familyOption':
      return <Trans>Reschedule family members</Trans>
    default:
      return ''
  }
}

class RegistrationPage extends React.Component {
  static errStrings = {}

  static get fields() {
    return getFieldNames(RegistrationFields)
  }

  static redirect(store = {}) {
    let { explanation: { explanationPage } = {} } = store
    return explanationPage ? '/explanation' : '/calendar'
  }

  static validate(values, submitted) {
    let registrationFields = RegistrationFields
    deleteEmptyArrayKeys(values)

    if (submitted || !windowExists()) {
      /*
      In NoJS mode, we want to return a validation error if someone:
      - has filled in family members
      - has not checked the Checkbox
      So this is the default behaviour

      In JS mode, we will not validate this
      */
      if (windowExists()) {
        registrationFields.familyCheck = 'accept_anything'
      }

      const validate = new Validator(
        trimInput(values),
        registrationFields,
        defaultMessages,
      )

      if (validate.passes()) {
        values.familyOption = values.familyCheck ? values.familyOption : ''
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
    this.state = { mounted: false }
  }

  componentDidMount() {
    /*
    this is used to see if we're in JS vs NoJS
    in place of windowExists in this case.

    using windowExists doesn't work in this case
    as it won't exist server-side but than will client-side
    */
    this.setState({ mounted: true })
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

    await this.props.history.push(this.redirect(this.props.context.store))
  }

  render() {
    let { context: { store: { register = {} } = {} } = {}, i18n } = this.props
    let errorsNoJS = {}

    throw new Error('help bad things are happening')

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
      <Layout contentClass={registrationContentClass}>
        <Title path={this.props.match.path} />
        <FocusedH1 className={visuallyhidden}>
          <Trans>First, provide some basic information:</Trans>
        </FocusedH1>
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

            /* if the values is passed via the url we need to convert
            the value for final form */
            if (typeof familyCheck === 'string' && familyCheck.length > 0) {
              values.familyCheck = ['familyCheck']
            }

            let disabled = { disabled: false }

            if (this.state.mounted) {
              /*
              'mounted' will be true after ComponentDidMount
              which won't be called server-side
                */
              disabled = { disabled: !familyCheck.length }
            }

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
                {/* Full name*/}
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
                {/* Email */}
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
                {/* Paper file number */}
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

                {/* Family option (checkbox and textarea) */}
                <div>
                  {/* Checkbox - Family option */}
                  <ValidationMessage
                    id="familyCheck-error"
                    message={
                      submitError && this.validate(values).familyCheck
                        ? this.validate(values).familyCheck
                        : ''
                    }
                  />
                  <Field
                    type="checkbox"
                    component={CheckboxAdapter}
                    name="familyCheck"
                    id="familyCheck"
                    label={<Trans>I need to reschedule my family too</Trans>}
                    value="familyCheck"
                    aria-labelledby="familyCheck-error familyCheck-label"
                  />
                  {/* Textarea - Family option */}
                  <Field
                    name="familyOption"
                    id="familyOption"
                    component={TextAreaAdapter}
                    {...disabled}
                    placeholder={`${i18n._(
                      'For example: “Full Name, Full Name, Full Name”',
                    )}`}
                  >
                    <label htmlFor="familyOption" id="familyOption-label">
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
                {/* Reason */}
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
                {/* Explanation */}
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

export default withI18n()(withContext(RegistrationPage))
