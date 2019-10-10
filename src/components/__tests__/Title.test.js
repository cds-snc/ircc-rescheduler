import React from 'react'
import { shallow } from 'enzyme'
import { BaseTitle as Title } from '../Title'

import { i18n } from '@lingui/core'

describe('<Title />', () => {
  it('returns "Page not found" title when no path parameter passed in', () => {
    const wrapper = shallow(<Title i18n={i18n} />)
    expect(wrapper.find('title').length).toBe(1)
    expect(wrapper.find('title').text()).toEqual(
      'Something went wrong. — Request an appointment for biometrics',
    )
  })

  it('returns "Page not found" title when path is an empty string', () => {
    const wrapper = shallow(<Title i18n={i18n} path={''} />)
    expect(wrapper.find('title').length).toBe(1)
    expect(wrapper.find('title').text()).toEqual(
      'Something went wrong. — Request an appointment for biometrics',
    )
  })

  const titles = [
    {
      path: '/',
      title: 'Request an appointment for biometrics',
    },
    {
      path: '/register',
      title:
        'Provide some basic information — Request an appointment for biometrics',
    },
    {
      path: '/calendar',
      title:
        'Select a days you’re available — Request an appointment for biometrics',
    },
    {
      path: '/review',
      title: 'Review your request — Request an appointment for biometrics',
    },
    {
      path: '/confirmation',
      title: 'Request received — Request an appointment for biometrics',
    },
    {
      path: '/cancel',
      title: 'Request cancelled — Request an appointment for biometrics',
    },
    {
      path: '/error',
      title: 'Something went wrong — Request an appointment for biometrics',
    },
    {
      path: '/confirmation/:error',
      title: 'Something went wrong — Request an appointment for biometrics',
    },
    {
      path: '/404',
      title: 'Something went wrong. — Request an appointment for biometrics',
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
