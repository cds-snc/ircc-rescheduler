import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { css } from 'react-emotion'
import {
  theme,
  visuallyhidden,
  mediaQuery,
  BottomContainer,
  focusRing,
} from '../styles'
import Layout from '../components/Layout'
import {
  TextFieldAdapter,
  TextAreaAdapter,
} from '../components/forms/TextInput'
import FieldSet from '../components/forms/FieldSet'
import { RadioAdapter } from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { ValidationMessage, ErrorList } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_USER_DATA } from '../queries'

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

    label,
    legend {
      display: block;
      margin-bottom: ${theme.spacing.sm};

      > span {
        margin-bottom: ${theme.spacing.xxs};
        display: block;

        &[id$='-header'] {
          font-weight: bold;
          font-size: ${theme.font.lg};
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
      return <Trans>Describe why you can’t attend your test</Trans>
    default:
      return ''
  }
}

function validateEmail(email) {
  /*eslint-disable */
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
  /*eslint-enable */
}

const validate = values => {
  const errors = {}
  if (!values.fullName) {
    errors.fullName = (
      <Trans>
        You need to tell us your name so we know who is requesting a new
        appointment.
      </Trans>
    )
  }
  if (!validateEmail(values.email)) {
    errors.email = (
      <Trans>
        You need to provide an email address so we can send you a confirmation
        message.
      </Trans>
    )
  }
  if (!values.paperFileNumber) {
    errors.paperFileNumber = (
      <Trans>
        You need to tell us your paper file number so we can confirm your
        identity.
      </Trans>
    )
  }
  if (!values.reason) {
    errors.reason = (
      <Trans>
        Please tell us why you need to reschedule your test. If none of the
        options fit your situation, choose ‘Other’.
      </Trans>
    )
  }
  if (!values.explanation) {
    errors.explanation = (
      <Trans>
        Please tell us a bit more about why you need to reschedule your test.
      </Trans>
    )
  }

  if (!validateEmail(values.email)) {
    errors.email = (
      <Trans>
        You need to provide an email address so we can send you a confirmation
        message.
      </Trans>
    )
  }

  return errors
}

class RegistrationPage extends React.Component {
  state = {
    data: {},
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      // 'result' would also be to place to check for potential graphql errors
      let result = await this.props.client.query({
        query: GET_USER_DATA,
      })

      let {
        data: { userRegistrationData },
      } = result

      this.setState({
        data: userRegistrationData,
      })
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
  }

  async onSubmit(values, event) {
    const submitErrors = validate(values)

    if (Object.keys(submitErrors).length) {
      this.errorContainer.focus()
      return {
        [FORM_ERROR]: <Trans>Some information is missing.</Trans>,
      }
    }

    const { client } = this.props
    /* Update the cache with the form values */
    try {
      await client.mutate({
        mutation: gql`
          mutation($formValues: UserData) {
            registerUser(data: $formValues) @client
          }
        `,
        variables: { formValues: values },
      })
    } catch (err) {
      //should be a logger
      console.log(err) // eslint-disable-line no-console
    }
    await this.props.history.push('/calendar')
  }

  render() {
    return (
      <Layout contentClass={contentClass}>
        <h1 className={visuallyhidden}>
          First verify your identity and tell us why you need a new appointment.
        </h1>
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.state.data}
          render={({ handleSubmit, submitError, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div
                id="submit-error"
                className={forNowSubmitErrorStyles}
                tabIndex="-1"
                ref={errorContainer => {
                  this.errorContainer = errorContainer
                }}
              >
                <ErrorList message={submitError || ''}>
                  {Object.keys(validate(values)).map((formId, i) => (
                    <a href={`#${formId}`} key={i}>
                      {labelNames(formId) ? labelNames(formId) : formId}
                      <br />
                    </a>
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
                        submitError && validate(values).fullName
                          ? validate(values).fullName
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
                <Field component={TextFieldAdapter} name="email" id="email">
                  <label htmlFor="email" id="email-label">
                    <span id="email-header">
                      <Trans>Email address</Trans>
                    </span>
                    <ValidationMessage
                      id="email-error"
                      message={
                        submitError && validate(values).email
                          ? validate(values).email
                          : ''
                      }
                    />
                    <span id="email-details">
                      <Trans>
                        We will send a confirmation message to this email
                        address.
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
                        submitError && validate(values).paperFileNumber
                          ? validate(values).paperFileNumber
                          : ''
                      }
                    />
                    <span id="paperFileNumber-details">
                      <Trans>
                        This number is at the top of the email we sent you.
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
                        submitError && validate(values).reason
                          ? validate(values).reason
                          : ''
                      }
                    />
                  </legend>

                  <Field
                    type="radio"
                    component={RadioAdapter}
                    label={<Trans>Travel</Trans>}
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
                    label={<Trans>Work or School</Trans>}
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
                      <Trans>Describe why you cannot attend your test</Trans>
                    </span>
                    <ValidationMessage
                      id="explanation-error"
                      message={
                        submitError && validate(values).explanation
                          ? validate(values).explanation
                          : ''
                      }
                    />
                    <span id="explanation-details">
                      <Trans>
                        Provide enough detail so that staff can understand your
                        situation.
                      </Trans>
                    </span>
                  </label>
                </Field>
              </div>
              {/*
               Button is disabled if form has been submitted (and is waiting)
              */}
              <BottomContainer>
                <Button disabled={submitting}>
                  <Trans>Continue</Trans>
                </Button>

                <div>
                  <NavLink to="/cancel">
                    <Trans>Cancel request</Trans>
                  </NavLink>
                </div>
              </BottomContainer>
            </form>
          )}
        />
      </Layout>
    )
  }
}
RegistrationPage.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.any,
}

export default withApollo(RegistrationPage)
