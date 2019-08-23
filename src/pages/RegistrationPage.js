import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans, withI18n } from '@lingui/react'
import { css } from 'emotion'
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
} from '../components/forms/TextInput'
import FieldSet from '../components/forms/FieldSet'
import {
  Radio,
  CheckboxAdapter,
} from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { ValidationMessage, ErrorList } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import CancelButton from '../components/CancelButton'
import { HashLink } from 'react-router-hash-link'
import { windowExists } from '../utils/windowExists'
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
    display: block;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  textarea[name='familyOption'] {
    height: 5.3em;
  }

  #familyOption-details {
    padding: ${theme.spacing.xxs} 0;
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
    case 'paperFileNumber':
      return <Trans>Bill file number</Trans>
    case 'email':
      return <Trans>Email address</Trans>
    case 'emailConfirm':
        return <Trans>Confirm Email address</Trans>
    case 'reason':
      return <Trans>Do you require accessibility?</Trans>
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

  static get redirect() {
    return '/selectProvince'
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
      // if (values.email !== values.emailConfirm){
      //   // eslint-disable-next-line no-console
      //   console.log('error check')
      //   RegistrationPage.errStrings= {emailConfirm : 'emailConfirmInvalidErrorMessage'}
      //   return RegistrationPage.errStrings  
      // } 
      // eslint-disable-next-line no-console
      console.log(values.email) , console.log(values.emailConfirm)

      if (validate.passes()) {
        values.familyOption = values.familyCheck ? values.familyOption : ''
        RegistrationPage.errStrings = {}
        return RegistrationPage.errStrings
      }

      RegistrationPage.errStrings = getFieldErrorStrings(validate)
    }
    // eslint-disable-next-line no-console
    console.log(RegistrationPage.errStrings)
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
    // eslint-disable-next-line no-console
    console.log(this.props.context.store )
    // eslint-disable-next-line no-console
    console.log(values)
    
    // if setStore doesn't exist, nothing gets saved between pages
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push(this.redirect)
  }

  render() {
    let {
      context: { store: { register = {} } = {} } = {},
      
      post = false,
    } = this.props
    let errorsNoJS = {}

    // if this is a POST, we know for sure they pressed "submit" on this page
    // Otherwise, we would be showing error messages on the initial pageload
    // (because the fields are empty
    if (post) {
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
                method="post"
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
                      {/* Paper file number */}
                <div>
                  <Field
                    component={TextFieldAdapter}
                    name="paperFileNumber"
                    id="paperFileNumber"
                  >
                    <label htmlFor="paperFileNumber" id="paperFileNumber-label">
                      <span id="paperFileNumber-header">
                        <Trans>BIL file number</Trans>
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
                          This number is at the top of the mailed letter we
                          sent you.
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
                          Please enter your email address.
                        </Trans>
                      </span>
                    </label>
                  </Field>
                </div>
                          {/* Email Confirm*/}
                 <div>
                  <Field component={TextFieldAdapter} name="emailConfirm" id="emailConfirm">
                    <label htmlFor="email" id="emailConfirm-label">
                      <span id="confirm-email-header">
                        <Trans>Confirm Email address</Trans>
                      </span>
                      <ValidationMessage
                        id="email-Confirm-error"
                        message={
                          submitError && this.validate(values).emailConfirm
                            ? this.validate(values).emailConfirm
                            : ''
                        }
                      />
                      <span id="confirm-email-details">
                        <Trans>
                          Please re-enter your email for confirmation.
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
                      type="checkbox"
                      component={CheckboxAdapter}  
                      label={<Trans>Agree</Trans>}
                      value="Yes"
                      name="accessibility required"
                      id="reason-0"
                      
                    />
                    
                  </FieldSet>
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
