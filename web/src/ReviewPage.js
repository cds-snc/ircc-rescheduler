import React from 'react'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { Query } from 'react-apollo'
import { NavLink } from 'react-router-dom'
import { H1, theme, BottomContainer, TopContainer } from './styles'
import Layout from './Layout'
import { GET_USER_DATA } from './queries'
import Button from './forms/Button'
import { Summary } from './Summary'
import { Reminder } from './Reminder'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class ReviewPage extends React.Component {
  translateReason(reason) {
    switch (reason) {
      case 'travel':
        return <Trans>Travel</Trans>
      case 'family':
        return <Trans>Family</Trans>
      case 'medical':
        return <Trans>Medical</Trans>
      case 'workOrSchool':
        return <Trans>Work or School</Trans>
      case 'other':
        return <Trans>Other</Trans>
      default:
        return null
    }
  }

  render() {
    return (
      <Layout contentClass={contentClass}>
        <TopContainer>
          <NavLink to="/calendar">
            <Trans>← Go Back</Trans>
          </NavLink>
        </TopContainer>
        <H1>
          <Trans>Review your request before sending it:</Trans>
        </H1>
        <Query query={GET_USER_DATA}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`
            return (
              <Summary
                fullName={data.userRegistrationData.fullName}
                paperFileNumber={data.userRegistrationData.paperFileNumber}
                explanation={data.userRegistrationData.explanation}
                reason={this.translateReason(data.userRegistrationData.reason)}
              />
            )
          }}
        </Query>

        <Reminder>
          <Trans>
            Remember: By sending this request, you are cancelling your currently
            scheduled test.
          </Trans>
        </Reminder>

        <BottomContainer>
          <NavLink to="/confirmation">
            <Button>
              <Trans>Send Request →</Trans>
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

export default ReviewPage
