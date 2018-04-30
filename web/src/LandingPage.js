import React from 'react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, H3, theme, mediaQuery } from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import { Trans } from 'lingui-react'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }

  li p:first-of-type {
    padding-bottom: 0rem;
  }

  li p:last-of-type {
    padding-bottom: 0rem;
  }

  li {
    padding-bottom: ${theme.spacing.sm};
  }

  li:last-of-type {
    padding-bottom: ${theme.spacing.lg};
  }
`

const list = css`
  list-style: disc;
  margin-left: ${theme.spacing.lg};
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
`

const landingSection = css`
  margin-bottom: ${theme.spacing.lg};
  width: 70%;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const moreInfo = css`
  font-family: ${theme.weight.l};
  font-size: ${theme.font.md};
`
const href = css`
  text-decoration: underline;
  color: ${theme.colour.black};
`

class LandingPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <section className={landingSection}>
          <H1>
            <Trans>
              Use this service to notify IRCC that you can’t attend your
              Citizenship test, and you need a new appointment.
            </Trans>
          </H1>
        </section>

        <section>
          <H2>
            <Trans>You will need:</Trans>
          </H2>
          <ul className={list}>
            <li>
              <p>
                <Trans>your paper file number</Trans>
              </p>
              <p className={moreInfo}>
                <Trans>
                  This is found at the top of your test notice email.
                </Trans>
              </p>
            </li>

            <li>
              <Trans>your full name, as it appears on your application</Trans>
            </li>
            <li>
              <p>
                <Trans>to explain your reason for rescheduling</Trans>
              </p>
              <span className={moreInfo}>
                <Trans>for more information on rescheduling,</Trans>{' '}
              </span>
              <span className={moreInfo}>
                <a
                  href="http://www.cic.gc.ca/english/helpcentre/answer.asp?qnum=786&amp;top=5"
                  className={href}
                >
                  <Trans>read the guidelines</Trans>
                </a>
              </span>
            </li>
          </ul>
        </section>

        <section className={landingSection}>
          <H2>
            <Trans>
              After verifying your personal information, you will be able to
              select three (3) alternative days when you are able to take the
              Citizenship test.
            </Trans>
          </H2>
        </section>

        <section className={landingSection}>
          <H3>
            <Trans>
              Important: by sending this request to reschedule, you will be
              cancelling your current test. After you complete this process, it
              could take up to 6 weeks for IRCC to contact you with a new test
              date.
            </Trans>
          </H3>
        </section>

        <NavLink to="/register">
          <Button>
            <Trans>Start Now →</Trans>
          </Button>
        </NavLink>
      </Layout>
    )
  }
}

export default LandingPage
