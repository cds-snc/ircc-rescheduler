import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, mediaQuery, arrow } from '../styles'
import Layout from '../components/Layout'
import { LongReminder } from '../components/Reminder'
import { buttonStyles } from '../components/forms/Button'
import { Trans } from 'lingui-react'
import rightArrow from '../assets/rightArrow.svg'
import { getStartMonthName, getEndMonthName } from '../utils/calendarDates'
import withContext from '../withContext'
import { contextPropTypes } from '../context'

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.xl};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
`

const CalendarIcon = styled.div`
  width: 3.45rem;
  height: 3.25rem;

  ${mediaQuery.md(css`
    width: 3.1rem;
    height: 3rem;
  `)};

  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MyA2MC4zNSI+PHRpdGxlPmFlcnR5QXNzZXQgMzwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBkPSJNMTEuMTEsNS4yYy4wNS0uNjUuMDUtMS4yNy4xMy0xLjg4QTMuODMsMy44MywwLDAsMSwxNC44NywwYTkuNjksOS42OSwwLDAsMSwyLjU5LjE1LDMuODQsMy44NCwwLDAsMSwyLjg4LDMuNzVjMCwuNDEsMCwuODIsMCwxLjI4SDM3LjQ1YzAtLjU1LDAtMS4wOCwwLTEuNjFBMy44NCwzLjg0LDAsMCwxLDQxLjE1LDBhOS4xMyw5LjEzLDAsMCwxLDIuNC4xQTMuOTQsMy45NCwwLDAsMSw0Ni42LDQuMjFjMCwuMzIsMCwuNjUsMCwxaC43OWMxLjk0LDAsMy44OSwwLDUuODIuMUE1LjA3LDUuMDcsMCwwLDEsNTcuNjksMTBjMCwuNDcuMDUsMSwuMDUsMS40MlYyOC4xOWE3LDcsMCwwLDEsMCwuOCwxLjI4LDEuMjgsMCwwLDEtMi41MS4wOSw0LjE3LDQuMTcsMCwwLDEtLjA4LS44NmMwLTIuMzgsMC00Ljc2LDAtNy4yMmgtLjdjLTEuNjgsMC0zLjM1LDAtNSwwQTEuMzMsMS4zMywwLDAsMSw0OCwyMC4xNGExLjE5LDEuMTksMCwwLDEsLjQyLTEuNDUsMS44MywxLjgzLDAsMCwxLDEtLjNjMS42MywwLDMuMjYsMCw0LjksMEg1NWMuMDYtLjA5LjA5LS4xMy4wOS0uMTYsMC0yLjY1LDAtNS4yOSwwLTcuOTRhMi4zOCwyLjM4LDAsMCwwLTIuMzItMi4zM2MtMi0uMS00LDAtNi4xMiwwLDAsLjU2LDAsMS4xMS0uMSwxLjY2YTMuNzcsMy43NywwLDAsMS0zLjYyLDMuNSwxMC4xOCwxMC4xOCwwLDAsMS0yLjc2LS4xNiwzLjc0LDMuNzQsMCwwLDEtMi43MS0zLjM1YzAtLjUzLDAtMS4wNywwLTEuNjRIMjAuMzRjMCwuMzUsMCwuNzEsMCwxLjA3YTMuODYsMy44NiwwLDAsMS0zLjk1LDQuMTEsNy42OCw3LjY4LDAsMCwxLTIuOTEtLjM3LDMuNzQsMy43NCwwLDAsMS0yLjMyLTMuNjRjMC0uMzcsMC0uNzQsMC0xLjA4LS4wNy0uMDYtLjEtLjExLS4xMy0uMTEtMS45NCwwLTMuODktLjA3LTUuODMsMGEyLjQyLDIuNDIsMCwwLDAtMi41MiwyLjQ2Yy0uMDgsMi41MiwwLDUuMDUsMCw3LjU3YTIuODIsMi44MiwwLDAsMCwwLC40NEg0MC4xNmEyLjcyLDIuNzIsMCwwLDEsMS4yMy4yNkExLjE1LDEuMTUsMCwwLDEsNDEuOTQsMjBhMS4wOCwxLjA4LDAsMCwxLS45MywxLDQuNyw0LjcsMCwwLDEtLjkyLjA4SDIuNjdjMCwuMjUsMCwuNDcsMCwuNjhWNDkuNDJjMCwyLjA2LDEsMy4wOCwzLjExLDMuMDhIMzBjLjI1LDAsLjUsMCwuNzQsMGExLjIyLDEuMjIsMCwwLDEsMS4xNiwxLjE2LDEuMjEsMS4yMSwwLDAsMS0xLDEuMzYsMy42MSwzLjYxLDAsMCwxLS43My4wN0g1LjU5YTUuMTgsNS4xOCwwLDAsMS01LjQtNEE2LjU1LDYuNTUsMCwwLDEsMCw0OS40NFEwLDMwLjE4LDAsMTAuOTFBNS4yNSw1LjI1LDAsMCwxLDQsNS40NWE3LjUzLDcuNTMsMCwwLDEsMS43MS0uMThjMS43NiwwLDMuNTIsMCw1LjI4LDBBLjUuNSwwLDAsMCwxMS4xMSw1LjJabTYuNjEsMS40MlY0Ljg5YzAtMi0uMjUtMi4yNi0yLjI0LTIuMjUtMS4yMSwwLTEuNjkuNDYtMS43LDEuNjdWOC4xNmMwLDIuMTEuMzIsMi40MiwyLjQsMi4zNWExLjQsMS40LDAsMCwwLDEuNTQtMS41OUMxNy43Myw4LjE1LDE3LjcyLDcuMzksMTcuNzIsNi42MlpNNDAsNi41MnYyYzAsMS42LjM2LDEuOTUsMiwxLjk1aC4zMWMxLjEzLDAsMS42MS0uNDksMS42Mi0xLjYyLDAtMS4yOCwwLTIuNTcsMC0zLjg1LjExLTIuNTctLjc3LTIuNDQtMi41OS0yLjRBMS4yNywxLjI3LDAsMCwwLDQwLjA1LDRDNDAsNC44Niw0MCw1LjY5LDQwLDYuNTJaIi8+PHBhdGggZD0iTTQ4LjU3LDMxLjUxQTE0LjQyLDE0LjQyLDAsMSwxLDM0LjEzLDQ1Ljk0LDE0LjQ2LDE0LjQ2LDAsMCwxLDQ4LjU3LDMxLjUxWk0zNi43Nyw0NS45QTExLjc5LDExLjc5LDAsMSwwLDQ4LjU5LDM0LjEyLDExLjc5LDExLjc5LDAsMCwwLDM2Ljc3LDQ1LjlaIi8+PHBhdGggZD0iTTE1Ljc1LDI4Ljg2YTIuNjIsMi42MiwwLDEsMS0yLjYtMi42MkEyLjYyLDIuNjIsMCwwLDEsMTUuNzUsMjguODZaIi8+PHBhdGggZD0iTTMxLjUsMjguODlhMi42NCwyLjY0LDAsMCwxLTIuNjEsMi42MSwyLjYzLDIuNjMsMCwwLDEsMC01LjI2QTIuNjQsMi42NCwwLDAsMSwzMS41LDI4Ljg5WiIvPjxwYXRoIGQ9Ik0xNS43NSw0My4zMmEyLjYyLDIuNjIsMCwxLDEtMi42NC0yLjYzQTIuNTksMi41OSwwLDAsMSwxNS43NSw0My4zMloiLz48cGF0aCBkPSJNNDYuMzgsNDcuNzZsNC4yOC00LjMzYy42NC0uNjQsMS4yOC0xLjI5LDEuOTMtMS45MmExLjMyLDEuMzIsMCwxLDEsMS44NywxLjg0cS0zLjQ5LDMuNTEtNyw3YTEuMzcsMS4zNywwLDAsMS0yLjE3LDBjLS44OC0uODctMS43Ni0xLjc0LTIuNjMtMi42M2ExLjMzLDEuMzMsMCwwLDEtLjExLTIsMS4zMiwxLjMyLDAsMCwxLDIsLjEzQzQ1LjEyLDQ2LjQ2LDQ1LjcsNDcuMDcsNDYuMzgsNDcuNzZaIi8+PC9nPjwvZz48L3N2Zz4=');
`

const messageContainer = css`
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }
`

const iconContainer = css`
  width: 3.45rem;
  height: 3.35rem;

  margin-right: ${theme.spacing.lg};

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

const H1Landing = styled(H1)`
  font-size: ${theme.font.xl};
  font-family: ${theme.weight.b}, Helvetica;
  line-height: 1;
`

const H2Landing = styled(H2)`
  font-family: ${theme.weight.r}, Helvetica;
  font-weight: 400;
`

class LandingPage extends React.Component {
  render() {
    let locale = 'en'

    if (
      this.props &&
      this.props.context &&
      this.props.context.store &&
      this.props.context.store.language
    ) {
      locale = this.props.context.store.language
    }
    return (
      <Layout contentClass={contentClass}>
        <section>
          <H1Landing>
            <Trans>
              Tell IRCC you can&rsquo;t attend your citizenship appointment, and
              request a new one.
            </Trans>
          </H1Landing>

          <H2Landing>
            <Trans>You will need:</Trans>
          </H2Landing>
          <ul className={list}>
            <li>
              <p>
                <Trans>Your paper file number</Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>To describe your reason for rescheduling</Trans>
              </p>
            </li>
          </ul>
          <div className={messageContainer}>
            <div className={iconContainer}>
              <CalendarIcon />
            </div>
            <p>
              <Trans>Then you’ll select</Trans>{' '}
              <strong>
                <Trans>3 days</Trans>
              </strong>{' '}
              <Trans>you&#39;re available between </Trans>{' '}
              {getStartMonthName(new Date(), locale)} <Trans>and</Trans>{' '}
              {getEndMonthName(new Date(), locale)}{' '}
            </p>
          </div>
        </section>

        <LongReminder>
          <Trans>
            Requesting a new appointment will cancel your current one. Do not
            attend your old appointment after you complete this request. It can
            take up to 9 weeks for us to reschedule you.
          </Trans>
        </LongReminder>

        <div>
          <NavLink to="/register" className={buttonStyles}>
            <Trans>Start now</Trans>{' '}
            <img src={rightArrow} className={arrow} alt="" />
          </NavLink>
        </div>
      </Layout>
    )
  }
}

LandingPage.propTypes = {
  ...contextPropTypes,
}

export default withContext(LandingPage)
