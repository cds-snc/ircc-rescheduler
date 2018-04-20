import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./LandingPage'),
      // eslint-disable-next-line react/display-name
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/register',
    exact: true,
    component: asyncComponent({
      loader: () => import('./RegistrationPage'),
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
    path: '/confirmation',
    exact: true,
    component: asyncComponent({
      loader: () => import('./ConfirmationPage'),
    }),
  },
  {
    path: '*',
    exact: true,
    component: asyncComponent({
      loader: () => import('./FourOhFourPage'),
    }),
  },
]
