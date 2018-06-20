import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, mediaQuery } from '../styles'
import Layout from '../components/Layout'
import Reminder from '../components/Reminder'
import { buttonStyles } from '../components/forms/Button'
import { Trans } from 'lingui-react'
import { Helmet } from 'react-helmet'
import rightArrow from '../assets/rightArrow.svg'

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.lg};
  }
`

const arrow = css`
  width: 0.9rem;
  height: 0.9rem;
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
  line-height: 1;
`

const LongReminder = styled(Reminder)`
  ${mediaQuery.md(css`
    display: block;
  `)};

  img {
    ${mediaQuery.md(css`
      float: left;
      margin-top: ${theme.spacing.xs};
      margin-right: ${theme.spacing.md};
    `)};
  }
`

const landingButton = css`
  margin-top: ${theme.spacing.md};
`

class LandingPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Helmet>
          <title>Request a new Canadian Citizenship appointment</title>
        </Helmet>
        <section>
          <H1Landing>
            <Trans>
              Tell IRCC that you can&#39;t attend your Citizenship test, and
              request a new appointment.
            </Trans>
          </H1Landing>

          <H2>
            <Trans>You will need:</Trans>
          </H2>
          <ul className={list}>
            <li>
              <p>
                <Trans>
                  Your <strong>paper file number</strong>
                </Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>To describe your reason for rescheduling</Trans>
              </p>
            </li>
          </ul>

          <p>
            <Trans>
              After that, you will select <strong>three (3) days</strong> when
              you’re available for an appointment in the future.
            </Trans>
          </p>
        </section>

        <LongReminder>
          <Trans>
            Requesting a new appointment will cancel your existing appointment.
            <strong> Do not attend your old appointment</strong> after you request a new one.
            It can take up to 9 weeks to schedule your new appointment.
          </Trans>
        </LongReminder>

        <div className={landingButton}>
          <NavLink to="/register" className={buttonStyles}>
            <Trans>Start Now</Trans>{' '}
            <img src={rightArrow} className={arrow} alt="" />
          </NavLink>
        </div>
      </Layout>
    )
  }
}

export default LandingPage
