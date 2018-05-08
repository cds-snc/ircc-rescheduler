import React from 'react'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { Query, Mutation } from 'react-apollo'
import { NavLink, Redirect } from 'react-router-dom'
import { H1, theme, BottomContainer, TopContainer } from './styles'
import Layout from './Layout'
import { GET_USER_DATA, SUBMIT } from './queries'
import Button from './forms/Button'
import Summary from './Summary'
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
          <Trans>Review your request before sending it</Trans>
        </H1>
        <Query query={GET_USER_DATA}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`
            let {
              userRegistrationData: {
                fullName,
                paperFileNumber,
                explanation,
                reason,
              },
              selectedDays,
            } = data

            return (
              <section>
                <Summary
                  fullName={fullName}
                  paperFileNumber={paperFileNumber}
                  explanation={explanation}
                  reason={this.translateReason(reason)}
                  selectedDays={selectedDays}
                />
                <Reminder>
                  <Trans>
                    Remember: By sending this request, you are cancelling your
                    currently scheduled test.
                  </Trans>
                </Reminder>

                <BottomContainer>
                  <Mutation mutation={SUBMIT}>
                    {(submit, { data }) => {
                      if (data) {
                        return <Redirect to="/confirmation" push />
                      } else {
                        return (
                          <Button
                            onClick={() => {
                              submit({
                                variables: {
                                  fullName,
                                  reason,
                                  explanation,
                                  paperFileNumber,
                                },
                              })
                            }}
                          >
                            <Trans>Send Request →</Trans>
                          </Button>
                        )
                      }
                    }}
                  </Mutation>
                  <div>
                    <NavLink to="/">
                      <Trans>Cancel</Trans>
                    </NavLink>
                  </div>
                </BottomContainer>
              </section>
            )
          }}
        </Query>
      </Layout>
    )
  }
}

export default ReviewPage
