import React from 'react'
import { Trans } from 'lingui-react'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content, TextLink } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import { TextInputAdapter, TextAreaAdapter } from './forms/TextInput'
import FieldSet from './forms/FieldSet'
import { RadioAdapter } from './forms/MultipleChoice'
import Button from './forms/Button'
import { Form, Field } from 'react-final-form'

injectGlobal`
  html, body {
    padding: 0;
    margin: 0;
    background: ${theme.colour.white};
    height: 100%;
    font-family: ${theme.weight.l};
    font-size: ${theme.font.md};

    ${mediaQuery.small(css`
      font-size: ${theme.font.xs};
    `)};
  }

  form {
    > div {
      margin-bottom: ${theme.spacing.xl};
    }

    legend > h2 {
      margin-top: 0 !important;
    }

    h2 + p,
    legend + p {
      margin-top: 0;
    }

    .form-error {
      color: red;
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
      <p className={`form-error ${attr}-error`}>
        <strong>{errors[attr]}</strong>
      </p>
    )
  }
  /* eslint-enable security/detect-object-injection */
}

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <AlphaBanner>
          {' '}
          <span>
            <Trans>This is a new service we are constantly improving.</Trans>
          </span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <H1>
              <Trans>Request a new Canadian Citizenship test date</Trans>
            </H1>
          </PageHeader>
          <Content>
            <Form
              onSubmit={async values => {}}
              validate={validate}
              render={({
                handleSubmit,
                submitError,
                submitting,
                pristine,
                values,
                errors,
                touched,
              }) => (
                <form
                  onSubmit={event => {
                    handleSubmit(event).then(() => {
                      // eslint-disable-next-line react/prop-types
                      this.props.history.push('/calendar')
                    })
                  }}
                >
                  {submitError && <div className="error">{submitError}</div>}
                  <div>
                    <Field
                      component={TextInputAdapter}
                      name="fullName"
                      id="fullName"
                      labelledby="fullName-label fullName-details fullName-error"
                    >
                      <H2>
                        <label htmlFor="fullName" id="fullName-label">
                          <Trans>Full name</Trans>
                        </label>
                      </H2>

                      <p id="fullName-details">
                        <Trans>
                          This is the full name you used on your citizenship
                          application.
                        </Trans>
                      </p>
                      {validationField({ touched, errors, attr: 'fullName' })}
                    </Field>
                  </div>
                  <div>
                    <Field
                      component={TextInputAdapter}
                      name="uciNumber"
                      id="uciNumber"
                      labelledby="uciNumber-label uciNumber-details uciNumber-error"
                    >
                      <H2>
                        <label htmlFor="uciNumber" id="uciNumber-label">
                          <Trans>Paper file number</Trans>
                        </label>{' '}
                        <Trans>(A123456)</Trans>
                      </H2>
                      <p id="uciNumber-details">
                        <Trans>
                          This number is at the top of the email we sent you
                        </Trans>
                      </p>
                      {validationField({ touched, errors, attr: 'uciNumber' })}
                    </Field>
                  </div>
                  <div>
                    <FieldSet legendHidden={false}>
                      <legend>
                        <H2>
                          <Trans>Reason for rescheduling</Trans>
                        </H2>
                      </legend>
                      <p id="reason-details">
                        {' '}
                        <Trans>
                          If you’re not sure if you can reschedule,
                        </Trans>{' '}
                        <TextLink href="#">
                          <Trans>read the guidelines for rescheduling.</Trans>
                        </TextLink>{' '}
                      </p>
                      {validationField({ touched, errors, attr: 'reason' })}
                      <Field
                        type="radio"
                        component={RadioAdapter}
                        label={
                          <span>
                            <Trans>Travel</Trans>
                          </span>
                        }
                        value="travel"
                        name="reason"
                        id="reason-0"
                      />
                      <Field
                        type="radio"
                        component={RadioAdapter}
                        label={
                          <span>
                            <Trans>Medical</Trans>
                          </span>
                        }
                        value="medical"
                        name="reason"
                        id="reason-1"
                      />
                      <Field
                        type="radio"
                        component={RadioAdapter}
                        label={
                          <span>
                            <Trans>Work or School</Trans>
                          </span>
                        }
                        value="workOrSchool"
                        name="reason"
                        id="reason-2"
                      />
                      <Field
                        type="radio"
                        component={RadioAdapter}
                        label={
                          <span>
                            <Trans>Family</Trans>
                          </span>
                        }
                        value="family"
                        name="reason"
                        id="reason-3"
                      />
                      <Field
                        type="radio"
                        component={RadioAdapter}
                        label={
                          <span>
                            <Trans>Other</Trans>
                          </span>
                        }
                        value="other"
                        name="reason"
                        id="reason-4"
                      />
                    </FieldSet>
                  </div>
                  <div>
                    {validationField({ touched, errors, attr: 'explanation' })}
                    <Field
                      name="explanation"
                      id="explanation"
                      component={TextAreaAdapter}
                      aria-labelledby="explanation-label explanation-error"
                    >
                      <H2>
                        <label
                          className="explanation-header"
                          htmlFor="explanation"
                          id="explanation-label"
                        >
                          <Trans>
                            Briefly tell us why you can’t attend your test
                          </Trans>
                        </label>
                      </H2>
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
                      Object.values(values).filter(v => v !== undefined)
                        .length < Object.keys(touched).length
                    }
                  >
                    <Trans>Next →</Trans>
                  </Button>
                </form>
              )}
            />
          </Content>
        </main>
        <Footer topBarBackground="black" />
      </div>
    )
  }
}

export default HomePage
