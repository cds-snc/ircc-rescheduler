import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/LandingPage'),
      // eslint-disable-next-line react/display-name
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/register',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/RegistrationPage'),
    }),
  },
  {
    path: '/calendar',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/CalendarPage'),
    }),
  },
  {
    path: '/nojscalendar',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/NoJSCalendarPage'),
    }),
  },
  {
    path: '/review',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/ReviewPage'),
    }),
  },
  {
    path: '/confirmation',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/ConfirmationPage'),
    }),
  },
  {
    path: '/error',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/ErrorPage'),
    }),
  },
  {
    path: '*',
    exact: true,
    component: asyncComponent({
      loader: () => import('./pages/FourOhFourPage'),
    }),
  },
]
