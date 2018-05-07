import { shallow } from 'enzyme'
import { Summary } from '../Summary'
import React from 'react'
import { Trans } from 'lingui-react'
import Time from '../Time'

const selectedDays = [
  new Date('2018-06-01T12:00:00.000'),
  new Date('2018-06-01T12:00:00.000'),
  new Date('2018-06-01T12:00:00.000'),
]

const renderSelectedDays = selectedDays => {
  return selectedDays && selectedDays.length > 0 ? (
    <ul>
      {selectedDays.map((day, index) => (
        <li key={index}>
          <Time date={day} />
        </li>
      ))}
    </ul>
  ) : (
    <p>
      <Trans>No dates selected</Trans>
    </p>
  )
}

const defaultProps = {
  fullName: 'Test1',
  paperFileNumber: '12346789',
  explanation: 'feeling lazy',
  reason: <Trans>Travel</Trans>,
  selectedDays: selectedDays,
}

describe('<Summary />', () => {
  it('renders', () => {
    const summary = shallow(<Summary {...defaultProps} />)
    const numOfSummaryRows = summary.children()

    expect(numOfSummaryRows.length).toBe(5)
    expect(numOfSummaryRows.at(0).prop('secondColumn')).toBe('Test1')
    expect(numOfSummaryRows.at(1).prop('secondColumn')).toBe('12346789')
    expect(numOfSummaryRows.at(2).prop('secondColumn').props.id).toBe('Travel')
    expect(numOfSummaryRows.at(3).prop('secondColumn')).toBe('feeling lazy')
    expect(numOfSummaryRows.at(4).prop('secondColumn')).toMatchObject(
      renderSelectedDays(selectedDays),
    )
  })
})
