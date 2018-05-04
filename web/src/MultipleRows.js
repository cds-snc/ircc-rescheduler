import React from 'react'
import PropTypes from 'prop-types'
import { H2, TextLink, change, Row, Column1, Column2, Column3 } from './styles'
import { Trans } from 'lingui-react'

const DateRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>
        <Trans>{header}</Trans>
      </H2>
    </Column1>
    <Column2>
      <p>{secondColumn}</p>
    </Column2>
    <Column3>
      <TextLink className={change} href="/calendar">
        <Trans>{thirdColumn}</Trans>
      </TextLink>
    </Column3>
  </Row>
)

const UserInfoRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>
        <Trans>{header}</Trans>
      </H2>
    </Column1>
    <Column2>
      <p>{secondColumn}</p>
    </Column2>
    <Column3>
      <TextLink href="/register">
        <Trans>{thirdColumn}</Trans>
      </TextLink>
    </Column3>
  </Row>
)

DateRow.propTypes = {
  header: PropTypes.string,
  secondColumn: PropTypes.string,
  thirdColumn: PropTypes.object,
}

UserInfoRow.propTypes = {
  header: PropTypes.string,
  secondColumn: PropTypes.string,
  thirdColumn: PropTypes.object,
}

export { DateRow, UserInfoRow }
