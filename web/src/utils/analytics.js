import ReactGA from 'react-ga'
import { windowExists } from '../utils/windowExists'

export const initGA = ga_id => {
  ReactGA.initialize(ga_id)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '', label = '') => {
  if (!windowExists() || !window.GA_INITIALIZED) return

  if (category && action && label) {
    ReactGA.event({ category, action, label })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
