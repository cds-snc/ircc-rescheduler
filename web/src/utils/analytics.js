import ReactGA from 'react-ga'

export const initGA = ga_id => {
  ReactGA.initialize(ga_id)
}

export const logPageView = () => {
  // eslint-disable-next-line no-console
  console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
