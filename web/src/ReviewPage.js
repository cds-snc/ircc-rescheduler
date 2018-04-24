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
  margin: ${theme.spacing.lg} 0 ${theme.spacing.lg} 0;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #a4a4a4;
  padding-top: ${theme.spacing.md};
  ${mediaQuery.small(css`
    display: block;
  `)};
`

const Column1 = styled.div`
  width: 25%;

  ${mediaQuery.small(css`
    width: 100%;
  `)};
`

const Column2 = styled.div`
  width: 35%;

  li {
    padding-bottom: ${theme.spacing.xs};
  }

  li:last-of-type {
    padding-bottom: ${theme.spacing.lg};
  }

  ${mediaQuery.small(css`
    width: 100%;
  `)};
`

const Column3 = styled.div`
  width: 2rem;

  ${mediaQuery.small(css`
    padding-bottom: ${theme.spacing.md};
  `)};
`

const change = css`
  position: relative;
  right: 1.2rem;

  ${mediaQuery.small(css`
    right: 0rem;
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

class ReviewPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <TopContainer>
          <NavLink to="/">
            <Trans>← Go Back</Trans>
          </NavLink>
        </TopContainer>
        <H1>
          <Trans>Review your request before sending it:</Trans>
        </H1>

        <TableContainer>
          <Row>
            <Column1>
              <H2>
                <Trans>Full name:</Trans>
              </H2>
            </Column1>
            <Column2>
              <p>
                <Trans>John Li</Trans>
              </p>
            </Column2>
            <Column3>
              <TextLink href="#">
                <Trans>Edit</Trans>
              </TextLink>
            </Column3>
          </Row>

          <Row>
            <Column1>
              <H2>
                <Trans>Paper file number:</Trans>
              </H2>
            </Column1>
            <Column2>
              <p>
                <Trans>1234567</Trans>
              </p>
            </Column2>
            <Column3>
              <TextLink href="#">
                <Trans>Edit</Trans>
              </TextLink>
            </Column3>
          </Row>

          <Row>
            <Column1>
              <H2>
                <Trans>Reason:</Trans>
              </H2>
            </Column1>
            <Column2>
              <p>
                <Trans>Travel</Trans>
              </p>
            </Column2>
            <Column3>
              <TextLink href="#">
                <Trans>Edit</Trans>
              </TextLink>
            </Column3>
          </Row>

          <Row>
            <Column1>
              <H2>
                <Trans>Explanation:</Trans>
              </H2>
            </Column1>
            <Column2>
              <p>
                <Trans>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Trans>
              </p>
            </Column2>
            <Column3>
              <TextLink href="#">
                <Trans>Edit</Trans>
              </TextLink>
            </Column3>
          </Row>

          <Row>
            <Column1>
              <H2>
                <Trans>Availability:</Trans>
              </H2>
            </Column1>
            <Column2>
              <ul>
                <li>
                  <Trans>Tuesday June 1, 2018</Trans>
                </li>
                <li>
                  <Trans>Friday June 11, 2018</Trans>
                </li>
                <li>
                  <Trans>Tuesday July 5, 2018</Trans>
                </li>
              </ul>
            </Column2>
            <Column3>
              <TextLink className={change} href="#">
                <Trans>Change</Trans>
              </TextLink>
            </Column3>
          </Row>
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
