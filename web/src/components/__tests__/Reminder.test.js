import React from 'react'
import { shallow } from 'enzyme'
import Reminder from '../Reminder'

describe('<Reminder />', () => {
  it('renders reminder message', () => {
    const reminder = shallow(<Reminder>Message</Reminder>)
    expect(reminder.find('img').length).toBe(1)
    expect(reminder.find('span').length).toBe(1)
  })
})
