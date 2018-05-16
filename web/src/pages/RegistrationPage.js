import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { theme, visuallyhidden, mediaQuery } from '../styles'
import Layout from '../components/Layout'
import {
  TextFieldAdapter,
  TextAreaAdapter,
} from '../components/forms/TextInput'
import FieldSet from '../components/forms/FieldSet'
import { RadioAdapter } from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { Form, Field } from 'react-final-form'
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

      ${mediaQuery.small(css`
        margin-bottom: ${theme.spacing.md};
      `)};
    }

    .form-error {
      color: red;
    }

    label,
    legend {
      display: block;
      margin-bottom: ${theme.spacing.sm};

      header,
      > span {
        margin-bottom: ${theme.spacing.xxs};
      }

      header {
        font-weight: bold;
        font-size: ${theme.font.lg};
      }

      > span {
        display: block;
      }
    }
  }
`

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
  if (!values.paperFileNumber) {
    errors.paperFileNumber = (
      <Trans>
        You need to tell us your Paper file number so we can confirm your
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
  return errors
}

const validationField = ({ touched, errors, attr }) => {
  /* eslint-disable security/detect-object-injection */
  if (touched[attr] && errors[attr]) {
    return (
      <span className={`form-error ${attr}-error`}>
        <strong>{errors[attr]}</strong>
      </span>
    )
  }
  /* eslint-enable security/detect-object-injection */
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
          validate={validate}
          initialValues={this.state.data}
          render={({
            handleSubmit,
            submitError,
            submitting,
            pristine,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              {submitError && <div className="error">{submitError}</div>}
              <div>
                <Field
                  component={TextFieldAdapter}
                  name="fullName"
                  id="fullName"
                >
                  <label htmlFor="fullName" id="fullName-label">
                    <header>
                      <Trans>Full name</Trans>
                    </header>
                    {validationField({ touched, errors, attr: 'fullName' })}
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
                    <header>
                      <Trans>Paper file number</Trans>
                    </header>
                    {validationField({
                      touched,
                      errors,
                      attr: 'paperFileNumber',
                    })}
                    <span id="paperFileNumber-details">
                      <Trans>
                        This number is at the top of the email we sent you.
                      </Trans>
                    </span>
                  </label>
                </Field>
              </div>
              <div>
                <FieldSet legendHidden={false}>
                  <legend>
                    <header>
                      <Trans>Reason for rescheduling</Trans>
                    </header>
                    <span id="reason-details">
                      <Trans>If you’re not sure if you can reschedule,</Trans>{' '}
                      <a href="http://www.cic.gc.ca/english/helpcentre/answer.asp?qnum=786&amp;top=5">
                        <Trans>read the guidelines for rescheduling</Trans>.
                      </a>
                    </span>
                    {validationField({ touched, errors, attr: 'reason' })}
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
                  <label
                    className="explanation-header"
                    htmlFor="explanation"
                    id="explanation-label"
                  >
                    <header>
                      <Trans>Tell us why you can’t attend your test</Trans>
                    </header>
                    <span id="explanation-details">
                      <Trans>
                        Provide enough detail so that IRCC staff can understand
                        your situation.
                      </Trans>
                    </span>
                    {validationField({ touched, errors, attr: 'explanation' })}
                  </label>
                </Field>
              </div>
              {/*
                      Button is disabled if:
                      - form has not been touched (ie, pristine)
                      - form has been submitted (and is waiting)
                      - the number of values entries is less than the total number of fields
              */}
              <Button
                disabled={
                  pristine ||
                  submitting ||
                  Object.values(values).filter(v => v !== undefined).length <
                    Object.keys(touched).length
                }
              >
                <Trans>Continue</Trans>
              </Button>
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
