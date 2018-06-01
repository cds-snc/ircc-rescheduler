import React from 'react'
import { shallow, mount } from 'enzyme'
import Summary, { SelectedDayList } from '../Summary'
import { Trans } from 'lingui-react'
import Time from '../Time'

const selectedDays = [
  new Date('2018-06-01T12:00:00.000'),
  new Date('2018-06-05T12:00:00.000'),
  new Date('2018-06-08T12:00:00.000'),
]

const defaultProps = {
  fullName: 'Test1',
  paperFileNumber: '12346789',
  explanation: 'feeling lazy',
  reason: <Trans>Travel</Trans>,
  selectedDays: selectedDays,
}

describe('<SelectedDayList />', () => {
  it('renders correct number of rows', () => {
    const wrapper = shallow(<SelectedDayList selectedDays={selectedDays} />)

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
      ).toEqual(shallow(<Time date={day} />).text())
    })
  })

  it('renders empty message when empty array passed in', () => {
    const wrapper = mount(<SelectedDayList selectedDays={[]} />)
    expect(wrapper.find('.no-dates-selected').text()).toEqual(
      'No dates selected',
    )
  })

  it('renders empty message when no arguments are passed in', () => {
    const wrapper = mount(<SelectedDayList />)
    expect(wrapper.find('.no-dates-selected').text()).toEqual(
      'No dates selected',
    )
  })
})

describe('<Summary />', () => {
  it('renders with correct data', () => {
    const wrapper = shallow(<Summary {...defaultProps} />)
    const numOfSummaryRows = wrapper.children()

    expect(numOfSummaryRows.length).toBe(5)
    expect(numOfSummaryRows.at(0).prop('firstColumnB')).toEqual('Test1')
    expect(numOfSummaryRows.at(1).prop('firstColumnB')).toEqual('12346789')
    expect(numOfSummaryRows.at(2).prop('firstColumnB').props.id).toEqual(
      'Travel',
    )
    expect(numOfSummaryRows.at(3).prop('firstColumnB')).toEqual('feeling lazy')
    expect(numOfSummaryRows.at(4).prop('firstColumnB')).toMatchObject(
      <SelectedDayList selectedDays={selectedDays} />,
    )
  })
})
