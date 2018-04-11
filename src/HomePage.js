import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content, TextLink } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import TextInput from './forms/TextInput'
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
  }

  ul {
    padding-left: 0em;
    list-style: none;
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  let errors = {}
  if (!values['last-name']) {
    errors['last-name'] = 'Last name is required'
  }
  if (errors) {
    return errors
  }
  window.alert(JSON.stringify(values, 0, 2))
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
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                submitError,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {submitError && <div className="error">{submitError}</div>}

                  <div>
                    <TextInput
                      name="last-name"
                      id="last-name"
                      labelledby="last-name-label last-name-details"
                    >
                      <H2>
                        <label htmlFor="last-name" id="last-name-label">
                          Full name
                        </label>
                      </H2>
                      <p id="last-name-details">
                        This is the full name you used on your citizenship
                        application.
                      </p>
                    </TextInput>
                  </div>

                  <div>
                    <TextInput
                      name="uci-number"
                      id="uci-number"
                      labelledby="uci-number-label uci-number-details"
                    >
                      <H2>
                        <label htmlFor="uci-number" id="uci-number-label">
                          UCI number
                        </label>{' '}
                        (A123456)
                      </H2>
                      <p id="uci-number-details">
                        This number is at the top of the email we sent you
                      </p>
                    </TextInput>
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
                    <Field
                      name="explanation"
                      id="explanation"
                      component="textarea"
                      aria-labelledby="explanation-label"
                    />
                  </div>

                  <Button disabled={submitting || pristine}>Next →</Button>
                </form>
              )}
            />

            <NavLink to="/calendar">
              <Button>Next →</Button>
            </NavLink>
          </Content>
        </main>
        <Footer topBarBackground="black" />
      </div>
    )
  }
}

export default HomePage
