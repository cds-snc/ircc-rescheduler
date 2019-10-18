import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { theme, mediaQuery, H2 } from '../styles'
import { Trans } from '@lingui/react'
import { HashLink as NavLink } from 'react-router-hash-link'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid ${theme.colour.greyLight};
  padding-top: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  ${mediaQuery.sm(css`
    display: block;
  `)};

  li {
    padding-bottom: 0;
    margin-bottom: ${theme.spacing.xs};
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`

const SummaryHeader = styled.div`
  width: 100%;
  margin-bottom: 0;
`

const SummaryBody = styled.div`
  width: 80%;
  overflow-wrap: break-word;
  word-wrap: break-word;
`

const SummaryBodyWhiteSpace = styled(SummaryBody)`
  white-space: pre-line;
`

const SummaryLink = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: 0;
  width: 6em;
  text-align: right;
`

const SummaryLinkExplanation = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: 0;
  width: 6em;
  text-align: right;
`

const SummaryH2 = styled(H2)`
  margin-bottom: ${theme.spacing.sm};
`
const SummaryRow = ({
  summaryId,
  summaryHeader,
  summaryBody,
  summaryLink,
  summaryLabel,
  // eslint-disable-next-line react/prop-types
  linkOnClick,
}) => (
  <Row id={summaryId}>
    <SummaryHeader>
      <SummaryH2 id={`${summaryId}-header`}>{summaryHeader}</SummaryH2>
      <SummaryBody id={`${summaryId}-body`}>{summaryBody}</SummaryBody>
    </SummaryHeader>

    {summaryLink ? (
      <SummaryLink id={`${summaryId}-link`} onClick={linkOnClick}>
        <NavLink to={summaryLink} aria-label={summaryLabel}>
          <Trans>Change</Trans>
        </NavLink>
      </SummaryLink>
    ) : (
      ''
    )}
  </Row>
)

const summaryRowProps = {
  summaryId: PropTypes.string,
  summaryHeader: PropTypes.object.isRequired,
  summaryBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  summaryLink: PropTypes.string,
  summaryLabel: PropTypes.string,
}

SummaryRow.propTypes = summaryRowProps

const TextAreaSummaryRow = ({
  summaryHeader,
  summaryBody,
  summaryLink,
  summaryLabel,
}) => (
  <Row>
    <SummaryHeader>
      <SummaryH2>{summaryHeader}</SummaryH2>
      <SummaryBodyWhiteSpace>{summaryBody}</SummaryBodyWhiteSpace>
    </SummaryHeader>

    {summaryLink ? (
      <SummaryLinkExplanation>
        <NavLink to={summaryLink} aria-label={summaryLabel}>
          <Trans>Change</Trans>
        </NavLink>
      </SummaryLinkExplanation>
    ) : (
      ''
    )}
  </Row>
)

TextAreaSummaryRow.propTypes = summaryRowProps

export { SummaryRow, TextAreaSummaryRow }
