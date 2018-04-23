import React from 'react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, H3, theme, TextLink, mediaQuery } from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import { Trans } from 'lingui-react'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }

  li {
    padding-bottom: ${theme.spacing.sm};
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

class LandingPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <section className={landingSection}>
          <H1>
            Use this service to notify IRCC that you can’t attend your
            Citizenship test, and you need a new appointment.
          </H1>
        </section>

        <section>
          <H2>You will need:</H2>
          <ul className={list}>
            <li>
              your paper file number<br />
              <span className={moreInfo}>
                This is found at the top of your test notice email.
              </span>
            </li>
            <li>your full name, as it appears on your application</li>
            <li>
              to explain your reason for rescheduling
              <p className={moreInfo}>
                for more information on rescheduling,{' '}
                <TextLink href="#">read the guidelines</TextLink>.
              </p>
            </li>
          </ul>
        </section>

        <section className={landingSection}>
          <H2>
            After verifying your personal information, you will be able to
            select three (3) alternative days when you are able to take the
            Citizenship test.
          </H2>
        </section>

        <section className={landingSection}>
          <H3>
            Important: by sending this request to reschedule, you will be
            cancelling your current test. After you complete this process, it
            could take up to 6 weeks for IRCC to contact you with a new test
            date.
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
