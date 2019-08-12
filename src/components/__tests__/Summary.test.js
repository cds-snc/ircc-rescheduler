import React from 'react'
import { shallow, mount } from 'enzyme'
import Summary, { SelectedDayList } from '../Summary'
import { Trans } from '@lingui/react'
import Time from '../Time'
import MemoryRouter from 'react-router-dom/MemoryRouter'

const selectedDays = [
  new Date('2018-06-01T12:00:00.000'),
  new Date('2018-06-05T12:00:00.000'),
  new Date('2018-06-08T12:00:00.000'),
]

const defaultProps = {
  fullName: 'Test1',
  email: 'test@test.com',
  paperFileNumber: '12346789',
  explanation: 'feeling lazy',
  reason: <Trans>Travel</Trans>,
  selectedDays: selectedDays,
}

describe('<SelectedDayList />', () => {
  it('renders correct number of rows', () => {
    const wrapper = mount(<SelectedDayList selectedDays={selectedDays} />)
    expect(wrapper.find('ul').length).toBe(1)
    expect(wrapper.find('li').length).toBe(selectedDays.length)
  })

  it('renders rows in order', () => {
    const wrapper = mount(<SelectedDayList selectedDays={selectedDays} />)

    selectedDays.map((day, index) => {
      expect(
        wrapper
          .find('li')
          .at(index)
          .text(),
      ).toEqual(shallow(<Time date={day} locale={'en'} />).text())
    })
  })

  it('renders empty message when empty array passed in', () => {
    const wrapper = mount(<SelectedDayList selectedDays={[]} />)
    expect(wrapper.find('.no-dates-selected').text()).toEqual(
      'No days selected',
    )
  })

  it('renders empty message when no arguments are passed in', () => {
    const wrapper = mount(<SelectedDayList />)
    expect(wrapper.find('.no-dates-selected').text()).toEqual(
      'No days selected',
    )
  })
})

describe('<Summary />', () => {
  it('renders with correct data', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Summary {...defaultProps} />
      </MemoryRouter>,
    )

    const numOfSummaryRows = wrapper.find('SummaryRow')
    const numOfTextSummaryRows = wrapper.find('TextAreaSummaryRow')

    expect(numOfSummaryRows.length).toBe(6)
    expect(numOfTextSummaryRows.length).toBe(1)
    expect(numOfSummaryRows.at(0).prop('summaryBody')).toEqual('Test1')
    expect(numOfSummaryRows.at(1).prop('summaryBody')).toEqual('test@test.com')
    expect(numOfSummaryRows.at(2).prop('summaryBody')).toEqual('12346789')
    expect(numOfSummaryRows.at(3).prop('summaryBody').props.id).toEqual(
      'Travel',
    )
    expect(numOfTextSummaryRows.at(0).prop('summaryBody')).toEqual(
      'feeling lazy',
    )
    expect(
      numOfSummaryRows.at(5).prop('summaryBody').props.selectedDays,
    ).toMatchObject(selectedDays)
  })
})
