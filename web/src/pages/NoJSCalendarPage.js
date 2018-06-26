import React from 'react'
import { TopContainer, BottomContainer, theme, H1, H2 } from '../styles'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import Reminder from '../components/Reminder'
import Button from '../components/forms/Button'

const headerStyles = css`
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};

  strong {
    font-weight: 700;
  }
`

const contentClass = css`
  h2 {
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
  }

  li {
    margin-bottom: ${theme.spacing.md};
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`

const CalendarHeader = styled(H1)`
  font-size: ${theme.font.xl};
  ${headerStyles};
`

const CalendarSubheader = styled(H2)`
  font-size: ${theme.font.lg};
  ${headerStyles};
  padding-bottom: 20px;
`

const listContainer = css`
  display: flex;
  margin-bottom: ${theme.spacing.xxl};
`

const column = css`
  border-left: 2px solid black;
  padding: 0 ${theme.spacing.xxxl} 0 ${theme.spacing.lg};
`

const CalReminder = styled(Reminder)`
  margin-bottom: ${theme.spacing.xxl} !important;
`

class NoJSCalendarPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <TopContainer>
          <nav>
            <NavLink to="/register">
              &#10094; <Trans>Go Back</Trans>
            </NavLink>
          </nav>
        </TopContainer>
        <CalendarHeader>
          <Trans>
            Citizenship appointments are scheduled on <strong>Tuesdays</strong>{' '}
            and <strong>Fridays</strong>.
          </Trans>
        </CalendarHeader>

        <CalendarSubheader>
          <Trans>
            <strong>Select 3 days</strong> you’re available:
          </Trans>
        </CalendarSubheader>

        <form className={listContainer}>
          <div className={column}>
            <H2>July</H2>
            <ul>
              <li>
                <input type="checkbox" value="test" /> Tuesday July 3
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday July 6
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday July 10
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday July 13
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday July 17
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday July 20
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday July 24
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday July 27
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday July 31
              </li>
            </ul>
          </div>
          <div className={column}>
            <H2>August</H2>
            <ul>
              <li>
                <input type="checkbox" value="test" /> Friday August 3
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday August 7
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday August 10
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday August 14
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday August 17
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday August 24
              </li>
              <li>
                <input type="checkbox" value="test" /> Friday August 28
              </li>
              <li>
                <input type="checkbox" value="test" /> Tuesday August 31
              </li>
            </ul>
          </div>
        </form>

        <CalReminder>
          <Trans>
            Make sure you stay available on all of the days you select.
          </Trans>
        </CalReminder>

        <BottomContainer>
          <Button>
            <Trans>Review request</Trans>
          </Button>

          <div>
            <NavLink to="/">
              <Trans>Cancel request</Trans>
            </NavLink>
          </div>
        </BottomContainer>
      </Layout>
    )
  }
}

export default NoJSCalendarPage
