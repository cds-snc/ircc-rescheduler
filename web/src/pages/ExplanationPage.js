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
  ExplanationFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'
import Validator from 'validatorjs'
import { trimInput } from '../utils/cleanInput'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import { TextAreaAdapter } from '../components/forms/TextInput'
import { Radio } from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { ValidationMessage } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import CancelButton from '../components/CancelButton'
import { windowExists } from '../utils/windowExists'
import { checkURLParams } from '../utils/url'

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
          font-size: ${theme.font.lg};
          font-weight: 700;
        }
      }
    }
  }
`

const explanationErrorStyles = css`
  margin-bottom: 0 !important;
  ${focusRing};

  border: solid 2px red;
  padding: ${theme.spacing.lg};

  h2 {
    margin-top: 0 !important;
  }

  > span:not(.empty) {
    margin-bottom: ${theme.spacing.lg};
    font-size: ${theme.font.lg};
  }
`

class ExplanationPage extends React.Component {
  static errStrings = {}

  static get fields() {
    return getFieldNames(ExplanationFields)
  }

  static get redirect() {
    return '/review'
  }

  static validate(values, submitted) {
    if (submitted || !windowExists()) {
      const validate = new Validator(
        trimInput(values),
        ExplanationFields,
        defaultMessages,
      )

      if (validate.passes()) {
        ExplanationPage.errStrings = {}
        return ExplanationPage.errStrings
      }

      ExplanationPage.errStrings = getFieldErrorStrings(validate)
    }

    return ExplanationPage.errStrings
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = ExplanationPage.validate
    this.fields = ExplanationPage.fields
    this.redirect = ExplanationPage.redirect
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
    if (windowExists()) {
      window.scrollTo(0, this.errorContainer.offsetTop - 20)
    }
    this.errorContainer.focus()

    if (Object.keys(submitErrors).length) {
      const generalMessage = this.generalErrorMessage()

      return {
        [FORM_ERROR]: generalMessage,
      }
    }

    // if setStore doesn't exist, nothing gets saved between pages
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push(this.redirect)
  }

  render() {
    let { context: { store: { explanation = {} } = {} } = {} } = this.props
    let errorsNoJS = {}
    // only run this if there's a location.search
    // AND at least one of our fields exists in the url keys somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      this.props.location.search &&
      this.props.location.pathname === '/explanation' &&
      checkURLParams(this.props.location.search, this.fields)
    ) {
      errorsNoJS = this.validate(explanation, true)
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
          initialValues={explanation || {}}
          render={({ handleSubmit, submitError, submitting, values }) => {
            const notValid = this.hasNotValid()
            const generalMessage = this.generalErrorMessage()

            submitError =
              Object.keys(errorsNoJS).length && !submitError
                ? generalMessage
                : submitError
            return (
              <form
                id="explanation-form"
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
                  className={explanationErrorStyles}
                  tabIndex="-1"
                  ref={errorContainer => {
                    this.errorContainer = errorContainer
                  }}
                >
                  <h2>{submitError}</h2>
                </div>

                <div>
                  <Field
                    name="explanationPage"
                    id="explanationPage"
                    component={TextAreaAdapter}
                    aria-labelledby="explanationPage-label explanationPage-error"
                  >
                    <label htmlFor="explanationPage" id="explanationPage-label">
                      <span id="explanationPage-header">
                        <Trans>
                          Describe why these dates don’t work for you.
                        </Trans>
                      </span>
                      <ValidationMessage
                        id="explanationPage-error"
                        message={
                          submitError && this.validate(values).explanationPage
                            ? this.validate(values).explanationPage
                            : ''
                        }
                      />
                      <span id="explanationPage-details">
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
ExplanationPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withContext(ExplanationPage)
