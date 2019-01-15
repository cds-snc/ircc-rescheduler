import ReactGA from 'react-ga'

export const initGA = ga_id => {
  ReactGA.initialize(ga_id)
}

export const logPageView = () => {
 return
}

export const logEvent = (category = '', action = '', label = '') => {
  return
}

export const logException = (description = '', fatal = false) => {
  return
}

export const trackRegistrationErrors = errObj => {
  return
}
