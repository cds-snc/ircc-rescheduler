import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { theme, mediaQuery, TextLink } from './styles'
import Layout from './Layout'
import { TextFieldAdapter, TextAreaAdapter } from './forms/TextInput'
import FieldSet from './forms/FieldSet'
import { RadioAdapter } from './forms/MultipleChoice'
import Button from './forms/Button'
import { Form, Field } from 'react-final-form'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_USER_DATA } from './queries'

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
        font-family: ${theme.weight.b};
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
        You need to tell us your full name so we can confirm your identity.
      </Trans>
    )
  }
  if (!values.uciNumber) {
    errors.uciNumber = (
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
    /*initialize the form values */
    await this.props.client.query({
      query: gql`
        {
          userRegistrationData @client {
            fullName
            uciNumber
            reason
            explanation
          }
        }
      `,
    })
    this.load()
  }

  load = async () => {
    let userRegistrationData = {}
    try {
      ({ userRegistrationData } = this.props.client.readQuery({
        query: GET_USER_DATA,
      }))

      this.setState({
        data: userRegistrationData,
      })
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
  }

  async onSubmit(values, event) {
    const { client } = this.props
    /*Update the cache with the form values */
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
                  name="uciNumber"
                  id="uciNumber"
                  labelledby="uciNumber-label uciNumber-details uciNumber-error"
                >
                  <label htmlFor="uciNumber" id="uciNumber-label">
                    <header>
                      <Trans>Paper file number</Trans> (123456)
                    </header>
                    {validationField({ touched, errors, attr: 'uciNumber' })}
                    <span id="uciNumber-details">
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
                      <TextLink href="#">
                        <Trans>read the guidelines for rescheduling</Trans>
                      </TextLink>.
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
                      <Trans>
                        Briefly tell us why you can’t attend your test
                      </Trans>
                    </header>
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
              <p>
                <strong>
                  <Trans>
                    By submitting this request you are forfeiting your original
                    test date.
                  </Trans>
                </strong>
              </p>
              <Button
                disabled={
                  pristine ||
                  submitting ||
                  Object.values(values).filter(v => v !== undefined).length <
                    Object.keys(touched).length
                }
              >
                <Trans>Next →</Trans>
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
  push: PropTypes.any,
}

export default withApollo(RegistrationPage)
