import React from 'react'
import PropTypes from 'prop-types'
import { H2, Row, Column1, Column2, Column3 } from './styles'
import { NavLink } from 'react-router-dom'
import { Trans } from 'lingui-react'

const SummaryRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>{header}</H2>
    </Column1>
    <Column2>{secondColumn}</Column2>
    <Column3>
      <NavLink to={thirdColumn}>
        <Trans>Change</Trans>
      </NavLink>
    </Column3>
  </Row>
)

SummaryRow.propTypes = {
  header: PropTypes.object.isRequired,
  secondColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thirdColumn: PropTypes.string.isRequired,
}

export { SummaryRow }
