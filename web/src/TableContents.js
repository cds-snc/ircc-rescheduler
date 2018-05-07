import React from 'react'
import PropTypes from 'prop-types'
import { H2, change, Row, Column1, Column2, Column3 } from './styles'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'

const DateRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>
        <Trans>{header}</Trans>
      </H2>
    </Column1>
    <Column2>{secondColumn}</Column2>
    <Column3>
      <NavLink activeClassName={change} to="/calendar">
        <Trans>{thirdColumn}</Trans>
      </NavLink>
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
      <NavLink to="/register">
        <Trans>{thirdColumn}</Trans>
      </NavLink>
    </Column3>
  </Row>
)

DateRow.propTypes = {
  header: PropTypes.string,
  secondColumn: PropTypes.object,
  thirdColumn: PropTypes.string,
}

UserInfoRow.propTypes = {
  header: PropTypes.string,
  secondColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thirdColumn: PropTypes.string,
}

export { DateRow, UserInfoRow }
