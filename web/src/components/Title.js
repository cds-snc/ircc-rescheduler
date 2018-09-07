import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withI18n } from '@lingui/react'

const matchPropTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}

const Title = ({ i18n, path }) => {
  let title = `${i18n._('Request a new citizenship appointment')}`
  let divider = '—'

  switch (path) {
    case '/':
      title = `${title}`
      break
    case '/register':
      title = `${i18n._('Provide some basic information')} ${divider} ${title}`
      break
    case '/calendar':
      title = `${i18n._('Select 3 days you’re available')} ${divider} ${title}`
      break
    case '/explanation':
      title = `${i18n._('Apply for an appointment extension')} ${divider} ${title}`
      break
    case '/review':
      title = `${i18n._('Review your request')} ${divider} ${title}`
      break
    case '/confirmation':
      title = `${i18n._('Request received')} ${divider} ${title}`
      break
    case '/cancel':
      title = `${i18n._('Request cancelled')} ${divider} ${title}`
      break
    case '/error':
    case '/confirmation/:error':
    case '/500':
      title = `${i18n._('Something went wrong')} ${divider} ${title}`
      break
    /* random urls (ie, 404 pages) */
    default:
      title = `${i18n._('Page not found')} ${divider} ${title}`
      break
  }

  return (
    <Helmet>
      <title>{`${title}`}</title>
    </Helmet>
  )
}
Title.propTypes = {
  i18n: PropTypes.object.isRequired,
  path: PropTypes.string,
}

const I18nTitle = withI18n()(({ i18n, ...props }) => (
  <Title i18n={i18n} {...props} />
))

//const I18nTitle = withI18n()(Title)
export { I18nTitle as default, Title as BaseTitle, matchPropTypes }
