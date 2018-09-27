import React from 'react'
import { shallow } from 'enzyme'
import { BaseTitle as Title } from '../Title'

import { i18n } from '@lingui/core'

describe('<Title />', () => {
  it('returns "Page not found" title when no path parameter passed in', () => {
    const wrapper = shallow(<Title i18n={i18n} />)
    expect(wrapper.find('title').length).toBe(1)
    expect(wrapper.find('title').text()).toEqual(
      'Page not found — Request a new citizenship appointment',
    )
  })

  it('returns "Page not found" title when path is an empty string', () => {
    const wrapper = shallow(<Title i18n={i18n} path={''} />)
    expect(wrapper.find('title').length).toBe(1)
    expect(wrapper.find('title').text()).toEqual(
      'Page not found — Request a new citizenship appointment',
    )
  })

  const titles = [
    {
      path: '/',
      title: 'Request a new citizenship appointment',
    },
    {
      path: '/register',
      title:
        'Provide some basic information — Request a new citizenship appointment',
    },
    {
      path: '/calendar',
      title:
        'Select 3 days you’re available — Request a new citizenship appointment',
    },
    {
      path: '/review',
      title: 'Review your request — Request a new citizenship appointment',
    },
    {
      path: '/confirmation',
      title: 'Request received — Request a new citizenship appointment',
    },
    {
      path: '/cancel',
      title: 'Request cancelled — Request a new citizenship appointment',
    },
    {
      path: '/error',
      title: 'Something went wrong — Request a new citizenship appointment',
    },
    {
      path: '/confirmation/:error',
      title: 'Something went wrong — Request a new citizenship appointment',
    },
    {
      path: '/404',
      title: 'Page not found — Request a new citizenship appointment',
    },
  ]
  titles.map(({ path, title }) => {
    it(`returns '${title}' when path is '${path}'`, () => {
      const wrapper = shallow(<Title i18n={i18n} path={path} />)
      expect(wrapper.find('title').length).toBe(1)
      expect(wrapper.find('title').text()).toEqual(title)
    })
  })
})
