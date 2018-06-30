// import 'babel-polyfill'
import { unpackCatalog } from 'lingui-i18n'
import en from '../../locale/en/messages.js'
import fr from '../../locale/fr/messages.js'

export const catalogs = { en: unpackCatalog(en), fr: unpackCatalog(fr) }

// required in development only (huge dependency)
export const linguiDev =
  process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined
