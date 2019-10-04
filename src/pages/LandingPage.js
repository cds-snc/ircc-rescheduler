import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans, withI18n } from '@lingui/react'
import { css } from 'emotion'
import styled from '@emotion/styled'
import { GoArrowRight } from 'react-icons/go'
import {
  H2,
  mediaQuery,
  theme,
  visuallyhidden,
  BottomContainer,
  focusRing,
  contentClass,
} from '../styles'
import {
  LandingFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'
import Validator from 'validatorjs'
import { trimInput, deleteEmptyArrayKeys } from '../utils/cleanInput'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import FieldSet from '../components/forms/FieldSet'
import { Radio, CheckboxAdapter } from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { ReportButton } from '../components/forms/ReportButton'
import { ValidationMessage, ErrorList } from '../components/ErrorMessage'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { HashLink } from 'react-router-hash-link'
import { windowExists } from '../utils/windowExists'
import { trackRegistrationErrors } from '../utils/analytics'
import FocusedH1 from '../components/FocusedH1'
// import rightArrow from '../assets/rightArrow.svg'
//import {logDebug} from '../utils/logger'
const CalendarIcon = styled.div`
  width: 3.45rem;
  height: 3.25rem;

  ${mediaQuery.md(css`
    width: 3.1rem;
    height: 3rem;
  `)};

  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjUgMTE1LjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyNSAxMTUuODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8dGl0bGU+YWVydHlBc3NldCAzPC90aXRsZT4KPGltYWdlIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIgd2lkdGg9IjE1MSIgaGVpZ2h0PSIxMzciIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSmNBQUFDSkNBSUFBQUN1SVQzRkFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFDCjJVbEVRVlI0bk8zYzdXMmpRQmdBWWZ1VUFpamhTcUFFWEpJN29BTzNrRTZnaEMzQkpkQUJKMW1uSk1vaXZLd1hiQS96L015SDQyWEUKQnBsWEhNZHhQT2pOL1RFZ2dCVUpyRWhnUllLUHg5ZHdQQjVudnV2VjB3Ykh4M09Sd0lvRVZpU3dJb0VWQ2F4SVlFVUNLeEpZa2NDSwpCRllrbUxoTFBQKzVuNTVyOG5OWHowVUNLeEpZa1NELy91TFhCcDE0LzJ4di8yNjNQRDZlaXdSV0pMQWlnUlVKQ2t4UE9SODFiNFBqCjQ3bElZRVdDL0IzVmoxdm5iWGw4UEJjSnJFaGdSUUlyRWxpUndJb0VWaVN3SW9FVkNheElZRVVDS3hKWWtjQ0tCRllrc0NKQjBsM2kKeStWUzEvWGVEOVhtUWdqbjh6bmxyeVpWck91NmFacTNPZ0w3NG81S1lFVUNLeEprenNCZGI1YitWbDNYVlZYOS9Fb0lZUmlHcGE4VAovNVB1KzM3cGkxUlY5ZXVTTFc5UmYyOStmcVhVb2hZWUkvSHZkbDMzNjRmYXRzMzRXL0hyNUwzMWxQZDhWOU0wUlJiVnR1MUtpK3E2Ckx1WEh4bkYwUnlXd0lzR2pGZU45cWNoMmx5M2V0RE8yelpSRnBXeWI4V2E3MHNIeFhDU3dJb0VWQ2F4SVlFVUNLeEpZa2NDS0JGWWsKc0NLQkZRa2VmV3JSTUF3WjkvYldFMEtZZisyVU80Z3BpMHE1ZzNpOVhyYzVPSTlXRENHY1RxZENiNmFBeEtHeGVhVVc5WG16NW5MLwpjMGNsc0NKQjBqUDh1NjV6SG5WN2ZkL0hHN3ZQOE1leUlvRVZDWnhIL2VZOGFoTG5VV2ZFaTNJZWRWK3NTUEFxODZoM1J6Y250NWVWCk9JK3FKN0FpZ1JVSnJFaGdSUUlyRWxpUndJb0VWaVN3SW9FVkNWNWxIdlh1Nk9iZFFkT0NuRWZOdE5ub1pncm5VZlVFVmlSd0h2VjEKT1krNkwxWWtzQ0tCODZqZm5FZE40anpxakhoUnpxUHVpeFVKYVBPb1JaNlBXb3J6cUZyQWlnUldKTEFpZ1JVSnJFaGdSUUlyRWxpUgp3SW9FVmlTZ3phTVdlVDVxS2M2alppcnlmTlJTbkVmVkFsWWtjQjcxZFRtUHVpOVdKTEFpZ1JVSmtxNXU0bWxnYldBWWh2aERqTW1yCm02U0tlaDFlbzJKWmtjQ0tCRllrbUxpbnNlVU12SXFZdUViVjIzRkhKYkFpZ1JVSnJFaGd4YmQzT0J6K0FiRlVjOUtFNytxMEFBQUEKQUVsRlRrU3VRbUNDIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjgyMTIgMCAwIDAuODIxMiAxIDIpIj4KPC9pbWFnZT4KPC9zdmc+Cg==');
`

const messageContainer = css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  p {
    margin-bottom: 0;
  }
`

const iconContainer = css`
  width: 3.45rem;
  height: 3.35rem;

  margin-right: ${theme.spacing.md};

  ${mediaQuery.md(css`
    width: 3.1rem;
    height: 3rem;
  `)};
`

const list = css`
  list-style: disc;
  margin-left: ${theme.spacing.lg};
  margin-top: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  li {
    margin-bottom: ${theme.spacing.sm};

    p {
      margin-bottom: 0;
    }
  }
`

const goArrowRight = css`
  fontsize: 24px;
  vertical-align: middle;
  left: 9px;
  height: 1.3rem;
  width: 1.3rem;
  bottom: 0.058em;
  position: relative;
`

const spacingButton = css`
  position: relative;
  top: 2px;
`
const spacingChebox = css`
  position: relative;
  top: 10px;
`

const landingPageContent = css`
  ${contentClass};
  input[name='paperFileNumber'] {
    margin-bottom: ${theme.spacing.sm};
  }
  input#policyCheck + label::before {
    border-width: 1.5px;
  }
  #policyCheck-error {
    margin-bottom: ${theme.spacing.sm};
  }
  label[for='policyCheck'] {
    display: block;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const forNowSubmitErrorStyles = css`
  margin-bottom: 0 !important;
  ${focusRing};
  > span:not(.empty) {
    margin-bottom: ${theme.spacing.lg};
    fontsize: ${theme.font.lg};
  }
`

const labelNames = id => {
  switch (id) {
    case 'policyCheck':
      return <Trans>Policy Check</Trans>
    default:
      return ''
  }
}

class LandingPage extends React.Component {
  static errStrings = {}

  static get fields() {
    return getFieldNames(LandingFields)
  }

  static get redirect() {
    return '/register'
  }

  static validate(values, submitted) {
    let landingFields = LandingFields
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
        landingFields.policyCheck = 'required'
      }

      const validate = new Validator(
        trimInput(values),
        landingFields,
        defaultMessages,
      )

      if (validate.passes()) {
        values.policyCheck = values.policyCheck ? values.policyCheck : ''
        LandingPage.errStrings = {}
        return LandingPage.errStrings
      }

      LandingPage.errStrings = getFieldErrorStrings(validate)
    }

    return LandingPage.errStrings
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = LandingPage.validate
    this.fields = LandingPage.fields
    this.redirect = LandingPage.redirect
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
    await this.props.context.setStore(this.props.match.path.slice(0), values)

    await this.props.history.push(this.redirect)
  }

  changeHandler(event) {
    // event.preventDefault()
    this.setState({ selectedId: event.target.value })
    this.props.selectedTimeId(event.target.value)
  }

  triggerAddTripState = () => {
    this.setState({
      ...this.state,
      isEmptyState: true,
      isAddTripState: false,
    })
  }

  render() {
    let {
      context: { store: { blank = {} } = {} } = {},

      post = false,
    } = this.props
    let errorsNoJS = {}

    const requiredStr = <Trans>(Required)</Trans>

    const policyStr = <Trans>I have read and accept the privacy policy</Trans>

    // if this is a POST, we know for sure they pressed "submit" on this page
    // Otherwise, we would be showing error messages on the initial pageload
    // (because the fields are empty
    if (post) {
      errorsNoJS = this.validate(blank, true)
    }

    return (
      <Layout contentClass={landingPageContent}>
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
          initialValues={blank || {}}
          render={({ handleSubmit, submitError, submitting, values }) => {
            const notValid = this.hasNotValid()
            const generalMessage = this.generalErrorMessage()

            submitError =
              Object.keys(errorsNoJS).length && !submitError
                ? generalMessage
                : submitError
            return (
              <form
                id="Blank-form"
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
                <section>
                  <H2
                    id="needed-info"
                    style={{
                      fontSize: `${theme.font.xxl}`,
                      marginBottom: `${theme.spacing.md}`,
                    }}
                  >
                    <Trans>You will need</Trans>
                  </H2>
                  <ul className={list}>
                    <li>
                      <p>
                        <Trans>Your</Trans>{' '}
                        <b>
                          <Trans>Application number</Trans>{' '}
                        </b>
                        <Trans>
                          which can be found at the top of the mailed letter we
                          sent you
                        </Trans>
                      </p>
                    </li>

                    <li>
                      <p>
                        <Trans>A</Trans>{' '}
                        <b>
                          <Trans>valid email address</Trans>
                        </b>{' '}
                        <Trans>where we can send a confirmation message</Trans>
                      </p>
                    </li>
                  </ul>

                  <div className={messageContainer}>
                    <div className={iconContainer}>
                      <CalendarIcon />
                    </div>
                    <p>
                      <Trans>Next, you</Trans>&#39;ll{' '}
                      <Trans>select a location, day and time you</Trans> &#39;
                      <Trans>re available within the next 30 days.</Trans>{' '}
                    </p>
                  </div>
                  <H2
                    id="privacy-notice"
                    style={{
                      fontSize: `${theme.font.xxl}`,
                    }}
                  >
                    <Trans>Privacy notice</Trans>
                  </H2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit
                    amet lacus accumsan et viverra justo commodo. Proin sodales
                    pulvinar sic tempor. Sociis natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Nam fermentum,
                    nulla luctus pharetra vulputate, felis tellus mollis orci,
                    sed rhoncus pronin sapien nunc.
                  </p>
                </section>

                <div className={spacingChebox}>
                  <FieldSet legendHidden={false} id="a11y-policy">
                    <legend>
                      <span id="a11y-policy-header">
                        {labelNames('policy')}
                      </span>
                    </legend>
                    <Field
                      type="checkbox"
                      component={CheckboxAdapter}
                      name="policyCheck"
                      id="policyCheck"
                      onClick={this.triggerAddTripState}
                      label={
                        <span>
                         {' '}
                         {policyStr}
                         <b
                           style={{
                             color: `${theme.colour.red}`,
                           }}
                         >
                          {' '} {requiredStr}
                         </b>
                        </span>
                      }
                      value="yes"
                      aria-label="policy-label"
                    />

                    {this.state.isEmptyState && (
                      <ValidationMessage
                        id="policy-error"
                        message={
                          submitError && this.validate(values).policyCheck
                            ? this.validate(values).policyCheck
                            : ''
                        }
                      />
                    )}

                    {this.state.isAddTripState && (
                      <ValidationMessage
                        id="policy-error"
                        message={
                          submitError && this.validate(values).policyCheck
                            ? this.validate(values).policyCheck
                            : 'sdasd'
                        }
                      />
                    )}
                  </FieldSet>
                </div>
                <div className={landingPageContent}>
                  <BottomContainer>
                    <Button
                      id="start-request"
                      onClick={() => {
                        this.triggerAddTripState()
                        this.setState({ submitClicked: true })
                      }}
                      disabled={submitting}
                    >
                      <Trans>Start request</Trans>
                      <GoArrowRight className={goArrowRight} />
                    </Button>
                  </BottomContainer>
                </div>
              </form>
            )
          }}
        />
        <div className={spacingButton}>
          <BottomContainer>
            <ReportButton />
          </BottomContainer>
        </div>
      </Layout>
    )
  }
}
LandingPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withI18n()(withContext(LandingPage))
