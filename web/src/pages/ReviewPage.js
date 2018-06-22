import React from 'react'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { Query } from 'react-apollo'
import { NavLink, Redirect } from 'react-router-dom'
import { H1, theme, BottomContainer, TopContainer, arrow } from '../styles'
import Layout from '../components/Layout'
import { GET_USER_DATA, SUBMIT } from '../queries'
import Button from '../components/forms/Button'
import Summary from '../components/Summary'
import { Submission } from '../components/Submission'
import Reminder from '../components/Reminder'
import rightArrow from '../assets/rightArrow.svg'

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
            ← <Trans>Go Back</Trans>
          </NavLink>
        </TopContainer>
        <H1>
          <Trans>Review your request</Trans>
        </H1>
        <Query query={GET_USER_DATA}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`
            let {
              userRegistrationData: {
                fullName,
                email,
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
                  email={email}
                  paperFileNumber={paperFileNumber}
                  explanation={explanation}
                  reason={this.translateReason(reason)}
                  selectedDays={selectedDays}
                />
                <Reminder>
                  <Trans>
                    Sending this request will cancel your current appointment.
                    <strong> Do not attend your old appointment</strong> after
                    you send this request.
                  </Trans>
                </Reminder>

                <BottomContainer>
                  <Submission
                    action={SUBMIT}
                    success={data => <Redirect to="/confirmation" push />}
                    failure={error => <Redirect to="/error" push />}
                  >
                    {submit => (
                      <Button
                        onClick={() => {
                          submit({
                            variables: {
                              fullName,
                              email,
                              reason,
                              explanation,
                              paperFileNumber,
                              availability: selectedDays,
                            },
                          })
                        }}
                      >
                        <Trans>Send Request</Trans>{' '}
                        <img src={rightArrow} className={arrow} alt="" />
                      </Button>
                    )}
                  </Submission>
                  <div>
                    <NavLink to="/cancel">
                      <Trans>Cancel request</Trans>
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
