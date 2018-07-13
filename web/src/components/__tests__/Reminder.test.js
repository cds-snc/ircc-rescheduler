import React from 'react'
import { render } from 'enzyme'
import Reminder from '../Reminder'
import { I18nProvider } from 'lingui-react'
import { i18n } from 'lingui-i18n/dist'
import { catalogs } from '../../utils/linguiUtils'

describe('<Reminder />', () => {
  it('renders reminder message', () => {
    const reminder = render(
      <I18nProvider language={'fr'} catalogs={catalogs}>
        <Reminder i18n={i18n}>Message</Reminder>
      </I18nProvider>,
    )
    expect(reminder.find('img').length).toBe(1)
    expect(reminder.find('span').length).toBe(1)
    expect(reminder.find('img').attr('alt')).toEqual('Message important')
  })
})
