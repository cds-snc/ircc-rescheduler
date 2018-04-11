import React from 'react'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content, TextLink } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import { TextInputAdapter } from './forms/TextInput'
import FieldSet from './forms/FieldSet'
import { Radio } from './forms/MultipleChoice'
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

  textarea {
    height: 10em;
    resize: none;
    width: 550px;
    margin-top: ${theme.spacing.sm};

    /* cribbed from TextInput */
    font-size: ${theme.font.lg};
    border: 3px solid ${theme.colour.grey}};
    outline: 0;
    padding: ${theme.spacing.xs};

    &:focus {
      outline: 3px solid ${theme.colour.focus};
      outline-offset: 0px;
    }
  }
`

const validate = values => {
  const errors = {}
  if (!values.fullName) {
    errors.fullName =
      'You need to tell us your full name so we can confirm your identity.'
  }
  if (!values.uciNumber) {
    errors.uciNumber =
      'You need to tell us your paper file number so we can confirm your identity.'
  }
  if (!values.reason) {
    errors.reason =
      'Please tell us why you need to reschedule your test. If none of the options fit your situation, choose ‘Other’.'
  }
  if (!values.explanation) {
    errors.explanation =
      'Please tell us a bit more about why you need to reschedule your test.'
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
          <span>This is a new service we are constantly improving.</span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <H1>Request a new Canadian Citizenship test date</H1>
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
                          Full name
                        </label>
                      </H2>

                      <p id="fullName-details">
                        This is the full name you used on your citizenship
                        application.
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
                          UCI number
                        </label>{' '}
                        (A123456)
                      </H2>
                      <p id="uciNumber-details">
                        This number is at the top of the email we sent you
                      </p>
                      {validationField({ touched, errors, attr: 'uciNumber' })}
                    </Field>
                  </div>
                  <div>
                    <FieldSet legendHidden={false}>
                      <legend>
                        <H2>Reason for rescheduling</H2>
                      </legend>
                      <p id="reason-details">
                        {' '}
                        If you’re not sure if you can reschedule,{' '}
                        <TextLink href="#">
                          read the guidelines for rescheduling.
                        </TextLink>{' '}
                      </p>
                      {validationField({ touched, errors, attr: 'reason' })}
                      <Radio
                        label={<span>Travel</span>}
                        value="travel"
                        name="reason"
                        id="reason-0"
                      />
                      <Radio
                        label={<span>Medical</span>}
                        value="medical"
                        name="reason"
                        id="reason-1"
                      />
                      <Radio
                        label={<span>Work or School</span>}
                        value="workOrSchool"
                        name="reason"
                        id="reason-2"
                      />
                      <Radio
                        label={<span>Family</span>}
                        value="family"
                        name="reason"
                        id="reason-3"
                      />
                      <Radio
                        label={<span>Other</span>}
                        value="other"
                        name="reason"
                        id="reason-4"
                      />
                    </FieldSet>
                  </div>
                  <div>
                    <H2>
                      <label
                        className="explanation-header"
                        htmlFor="explanation"
                        id="explanation-label"
                      >
                        Briefly tell us why you can’t attend your test
                      </label>
                    </H2>
                    {validationField({ touched, errors, attr: 'explanation' })}
                    <Field
                      name="explanation"
                      id="explanation"
                      component="textarea"
                      aria-labelledby="explanation-label explanation-error"
                    />
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
                    Next →
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
