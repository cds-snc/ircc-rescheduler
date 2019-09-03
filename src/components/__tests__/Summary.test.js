import React from 'react'
import { shallow, mount } from 'enzyme'
import Summary, { SelectedDayList } from '../Summary'
import { Trans } from '@lingui/react'
import Time from '../Time'
import MemoryRouter from 'react-router-dom/MemoryRouter'

const selectedDays = [
  new Date('2018-06-01T12:00:00.000'),
]

const defaultProps = {
  paperFileNumber: 'A123467890112',
  email: 'test@test.com',
  accessibility: 'No',
  location: 'Ottawa, 123 Somewhere Street',
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

    expect(numOfSummaryRows.length).toBe(5)
    expect(numOfTextSummaryRows.length).toBe(0)
    expect(numOfSummaryRows.at(0).prop('summaryBody')).toEqual('A123467890112')
    expect(numOfSummaryRows.at(1).prop('summaryBody')).toEqual('test@test.com')
    expect(numOfSummaryRows.at(2).prop('summaryBody')).toEqual('No')
    expect(numOfSummaryRows.at(3).prop('summaryBody')).toEqual('Ottawa, 123 Somewhere Street')
    
    expect(
      numOfSummaryRows.at(4).prop('summaryBody').props.selectedDays,
    ).toMatchObject(selectedDays)
  })
})
