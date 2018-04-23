import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import {
  H1,
  H2,
  theme,
  BottomContainer,
  TopContainer,
  TextLink,
  mediaQuery,
} from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import { Trans } from 'lingui-react'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

const TableContainer = styled.div`
  width: 80%;
  margin: ${theme.spacing.xl} 0 ${theme.spacing.lg} 0;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  ${mediaQuery.small(css`
    display: block;
  `)};
`

const Column = styled.div`
  width: 33%;

  ${mediaQuery.small(css`
    width: 100%;
  `)};
`

const EditColumn = styled.div`
  width: 2rem;
  padding-bottom: ${theme.spacing.xs};
`

const ChangeColumn = styled.div`
  width: 3.5rem;
  padding-bottom: ${theme.spacing.xs};
`

const AvailabiltyColumn = styled.div`
  width: 33%;
  padding-left: 0.7rem;

  li {
    padding-bottom: ${theme.spacing.md};
    padding-left: 0rem;
  }

  ${mediaQuery.small(css`
    padding-left: 0rem;
    width: 100%;
  `)};
`

const Reminder = styled.section`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  margin-bottom: ${theme.spacing.xl};
  width: 80%;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const DottedLine = styled.hr`
  border: 0 none;
  border-top: 1px dashed #a4a4a4;
  background: none;
  height: 0;
`

class ReviewPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <TopContainer>
          <NavLink to="/">← Go Back</NavLink>
        </TopContainer>
        <H1>Review your request before sending it:</H1>

        <TableContainer>
          <Row>
            <Column>
              <H2>Full name:</H2>
            </Column>
            <Column>
              <p>John Li</p>
            </Column>
            <EditColumn>
              <TextLink href="#">Edit</TextLink>
            </EditColumn>
          </Row>

          <DottedLine />

          <Row>
            <Column>
              <H2>Paper file number:</H2>
            </Column>
            <Column>
              <p>1234567</p>
            </Column>
            <EditColumn>
              <TextLink href="#">Edit</TextLink>
            </EditColumn>
          </Row>

          <DottedLine />

          <Row>
            <Column>
              <H2>Reason:</H2>
            </Column>
            <Column>
              <p>Travel</p>
            </Column>
            <EditColumn>
              <TextLink href="#">Edit</TextLink>
            </EditColumn>
          </Row>

          <DottedLine />

          <Row>
            <Column>
              <H2>Explanation:</H2>
            </Column>
            <Column>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Column>
            <EditColumn>
              <TextLink href="#">Edit</TextLink>
            </EditColumn>
          </Row>

          <DottedLine />

          <Row>
            <Column>
              <H2>Availability:</H2>
            </Column>
            <AvailabiltyColumn>
              <ul>
                <li>Tuesday June 1, 2018</li>
                <li>Friday June 11, 2018</li>
                <li>Tuesday July 5, 2018</li>
              </ul>
            </AvailabiltyColumn>
            <ChangeColumn>
              <TextLink href="#">Change</TextLink>
            </ChangeColumn>
          </Row>

          <DottedLine />
        </TableContainer>
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
