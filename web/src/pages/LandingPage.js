import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, H3, theme } from '../styles'
import Layout from '../components/Layout'
import Reminder from '../components/Reminder'
import { buttonStyles } from '../components/forms/Button'
import { Trans } from 'lingui-react'
import { Helmet } from 'react-helmet'

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.lg};
  }
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

    p + p {
      font-size: ${theme.font.md};
    }
  }
`

const H1Landing = styled(H1)`
  font-size: ${theme.font.xl};
  line-height: 1;
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
              Use this service to notify Immigration, Refugees and Citizenship
              Canada that you cannot attend your Citizenship test, and you need
              a new appointment.
            </Trans>
          </H1Landing>
        </section>

        <section>
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
              <p>
                <Trans>
                  This is found at the top of your test notice email.
                </Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>Your full name</Trans>
              </p>
              <p>
                <Trans>This should match the name on your application.</Trans>
              </p>
            </li>

            <li>
              <p>
                <Trans>To describe your reason for rescheduling</Trans>
              </p>
              <p>
                <Trans>
                  For more information on rescheduling,{' '}
                  <a href="http://www.cic.gc.ca/english/helpcentre/answer.asp?qnum=786&amp;top=5">
                    read the guidelines
                  </a>.
                </Trans>
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

        <Reminder>
          <H3>
            <Trans>
              Important: by sending this request to reschedule, you will be
              cancelling your current test. After you complete this process, it
              could take up to 6 weeks for IRCC to contact you with a new test
              date.
            </Trans>
          </H3>
        </Reminder>

        <NavLink to="/register" className={buttonStyles}>
          <Trans>Start Now</Trans> →
        </NavLink>
      </Layout>
    )
  }
}

export default LandingPage
