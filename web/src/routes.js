import withProvider from './withProvider'

import LandingPage from './pages/LandingPage'
import RegistrationPage from './pages/RegistrationPage'
import CalendarPage from './pages/CalendarPage'
import ReviewPage from './pages/ReviewPage'
import ConfirmationPage from './pages/ConfirmationPage'
import ErrorPage from './pages/ErrorPage'
import CancelPage from './pages/CancelPage'
import SomethingWrongPage from './pages/SomethingWrongPage'
import FourOhFourPage from './pages/FourOhFourPage'

export default [
  {
    path: '/',
    exact: true,
    component: withProvider(LandingPage),
  },
  {
    path: '/register',
    exact: true,
    component: withProvider(RegistrationPage),
  },
  {
    path: '/calendar',
    exact: true,
    component: withProvider(CalendarPage),
  },
  {
    path: '/review',
    exact: true,
    component: withProvider(ReviewPage),
  },
  {
    path: '/confirmation/:error',
    exact: true,
    component: withProvider(ConfirmationPage),
  },
  {
    path: '/confirmation',
    exact: true,
    component: withProvider(ConfirmationPage),
  },

  {
    path: '/error',
    exact: true,
    component: withProvider(ErrorPage),
  },
  {
    path: '/cancel',
    exact: true,
    component: withProvider(CancelPage),
  },
  {
    path: '/request-issue/:error(1|2)',
    exact: true,
    component: withProvider(SomethingWrongPage),
  },
  {
    path: '*',
    exact: true,
    component: withProvider(FourOhFourPage),
  },
]
