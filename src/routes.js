import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./HomePage'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/calendar',
    exact: true,
    component: asyncComponent({
      loader: () => import('./CalendarPage'), // required
    }),
  },
  {
    path: '/availability',
    exact: true,
    component: asyncComponent({
      loader: () => import('./AvailabilityPage'), // required
    }),
  },
  {
    path: '/confirmation',
    exact: true,
    component: asyncComponent({
      loader: () => import('./ConfirmationPage'), // required
    }),
  },
]
