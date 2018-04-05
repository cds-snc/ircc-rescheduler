import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./HomePage'),
      // eslint-disable-next-line react/display-name
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/calendar',
    exact: true,
    component: asyncComponent({
      loader: () => import('./CalendarPage'),
    }),
  },
  {
    path: '/availability',
    exact: true,
    component: asyncComponent({
      loader: () => import('./AvailabilityPage'),
    }),
  },
  {
    path: '/confirmation',
    exact: true,
    component: asyncComponent({
      loader: () => import('./ConfirmationPage'),
    }),
  },
  {
    path: '/graphql',
    exact: true,
    component: asyncComponent({
      loader: () => import('./GraphQLPage'),
    }),
  },
]
