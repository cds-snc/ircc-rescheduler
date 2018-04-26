import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { H2, theme, TextLink, mediaQuery } from './styles'
import { Trans } from 'lingui-react'

const TableContainer = styled.div`
  width: 80%;
  margin: ${theme.spacing.lg} 0 ${theme.spacing.lg} 0;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const change = css`
  position: relative;
  right: 1.2rem;

  ${mediaQuery.small(css`
    right: 0rem;
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

export const Summary = ({ fullName, uciNumber, reason, explanation }) => (
  <TableContainer>
    <Row>
      <Column1>
        <H2>
          <Trans>Full name:</Trans>
        </H2>
      </Column1>
      <Column2>
        <p>{fullName}</p>
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
        <p>{uciNumber}</p>
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
        <p>{reason}</p>
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
        <p>{explanation}</p>
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
)

Summary.propTypes = {
  fullName: PropTypes.string,
  reason: PropTypes.object,
  explanation: PropTypes.string,
  uciNumber: PropTypes.string,
}
