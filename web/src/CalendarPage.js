import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, CalHeader, CalReminder, Bold } from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import Calendar from './Calendar'

const TopContainer = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  > div {
    margin-left: ${theme.spacing.xxxl};
  }

  ${mediaQuery.xs(css`
    text-align: center;
    flex-direction: column;

    > a,
    > div {
      width: 100%;
    }

    > div {
      margin-left: 0;
      margin-top: ${theme.spacing.xl};
    }
  `)};
`

class CalendarPage extends Component {
  render() {
    return (
      <Layout>
        <TopContainer>
          <nav>
            <NavLink to="/">
              <Trans>← Go Back</Trans>
            </NavLink>
          </nav>
        </TopContainer>

        <CalHeader>
          <Trans>
            Citizenship Tests are scheduled on <Bold>Tuesdays</Bold> and{' '}
            <Bold>Fridays</Bold>. Use the calendar to select{' '}
            <Bold>at least four days you’re available</Bold> in June and July.
          </Trans>
        </CalHeader>
        <Calendar />
        <CalReminder>
          <Trans>
            Remember: make sure to stay available on all of the days you select
          </Trans>
        </CalReminder>
        <BottomContainer>
          <NavLink to="/confirmation">
            <Button>
              <Trans>Review →</Trans>
            </Button>
          </NavLink>

          <div>
            <NavLink to="/">
              <Trans>Cancel</Trans>
            </NavLink>
          </div>
        </BottomContainer>
      </Layout>
    )
  }
}

export default CalendarPage
