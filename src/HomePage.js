import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content, TextLink } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
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

#name-details, #uci-number-details,
#explanation-details, #reason-details {
    margin-top: ${theme.spacing.xs};
}

ul {
  padding-left: 0em;
  list-style: none;
}

input[type="text"] {
    border: solid 0.2em black;
    width: 50%;
    height: 2em;
}

input[type="radio"] {
    display: none;
}

input[type="radio"] + label {
    color: ${theme.font.black};
    font-family: ${theme.weight.m};
    font-size: ${theme.font.md};

}
input[type="radio"] + label span {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    cursor: pointer;
    margin-right: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    border-radius: 50%;
}

input[type="radio"] + label span {
  background: url('https://cdn.rawgit.com/nmakuch/60034bd0d4b98c57dd90776b9816731f/raw/4dd00e085a17b996d8a7b6e9ffde14f02e7aae0a/empty.svg');
  margin-top: ${theme.spacing.sm};
}

input[type="radio"]:checked + label span{
  background: url('https://cdn.rawgit.com/nmakuch/e3cd68811dbc645d5c93e2b1626ddb2e/raw/6a1cd0e9541615fd3316063487bd6d702ad88a5d/checked.svg');
}

textarea {
  width: 60%;
  height: 15em;
  border: solid 0.2em black;
  margin-top: ${theme.spacing.md};
  resize: none;
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
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                  {submitError && <div className="error">{submitError}</div>}

                  <Field name="last-name">
                    {({ input, meta }) => (
                      <div>
                        <H2>
                          <label htmlFor="last-name" id="last-name-label">
                            Full name
                          </label>
                        </H2>
                        <p id="last-name-details">
                          This is the full name you used on your citizenship
                          application.
                        </p>
                        <input
                          {...input}
                          id="last-name"
                          type="text"
                          placeholder="Full name"
                          aria-labelledby="last-name-label last-name-details"
                        />
                        {(meta.error || meta.submitError) && (
                          <span>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div>
                    <H2>
                      <label htmlFor="uci-number" id="uci-number-label">
                        UCI number
                      </label>{' '}
                      (A123456)
                    </H2>
                    <p id="uci-number-details">
                      This number is at the top of the email we sent you
                    </p>
                    <Field
                      name="uci-number"
                      id="uci-number"
                      component="input"
                      type="text"
                      placeholder="UCI number"
                      aria-labelledby="uci-number-label uci-number-details"
                    />
                  </div>

                  <div>
                    <H2>
                      <label htmlFor="reason" id="reason-label">
                        Reason for rescheduling
                      </label>
                    </H2>
                    <p id="reason-details">
                      {' '}
                      If you’re not sure if you can reschedule,{' '}
                      <TextLink href="#">
                        read the guidelines for rescheduling.
                      </TextLink>{' '}
                    </p>

                    <Field
                      name="reason"
                      id="reason"
                      component="input"
                      type="text"
                      placeholder="reason"
                    />
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
                    <p id="explanation-details">
                      If you’re not sure that you can reschedule, read the
                      guidelines for scheduling.
                    </p>
                    <Field
                      name="explanation"
                      id="explanation"
                      component="textarea"
                      aria-labelledby="explanation-label explanation-details"
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
