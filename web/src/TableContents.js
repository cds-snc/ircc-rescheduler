import React from 'react'
import PropTypes from 'prop-types'
import { H2, Row, Column1, Column2, Column3 } from './styles'

const SummaryRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>{header}</H2>
    </Column1>
    <Column2>{secondColumn}</Column2>
    <Column3>{thirdColumn}</Column3>
  </Row>
)

SummaryRow.propTypes = {
  header: PropTypes.object.isRequired,
  secondColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thirdColumn: PropTypes.object.isRequired,
}

export { SummaryRow }
