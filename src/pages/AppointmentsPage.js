import React from 'react'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Chevron from '../components/Chevron'
import styled from '@emotion/styled'
import { css } from 'emotion'
import AppointmentForm from '../components/SelectAppointment'


const AppointmentsH1 = styled(H1)`
  margin-bottom: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  font-weight: normal;
`

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.md};
  }
`
export class AppointmentsPageContent extends React.Component {
  render() {
    return (
      <section>
        <AppointmentsH1>
          <Trans>Available Appointments</Trans>
        </AppointmentsH1>
      </section>
    )
  }
}

class AppointmentsPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" /> <Trans>Home</Trans>
        </NavLink>
        <AppointmentsPageContent/>
        <AppointmentForm/>
      </Layout>
    )
  }
}
AppointmentsPage.propTypes = matchPropTypes

export default AppointmentsPage
