// import 'babel-polyfill'
import { unpackCatalog } from 'lingui-i18n'
import en from '../../locale/en/messages.js'
import fr from '../../locale/fr/messages.js'

export const catalogs = { en: unpackCatalog(en), fr: unpackCatalog(fr) }

// required in development only (huge dependency)
export const linguiDev =
  process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined

/*
  Helper method that checks to see if the i18n object is null or not, since it ends up being null
  if the user refreshes the page. Returns the original text (i18n.t doesnt work and returns english) otherwise.
  The reason we have to sometimes use this method over say the <Trans> tag is that we need the text to be a string at compile time
  */
export const translateText = (i18n, text) => {
  const translation = i18n === undefined ? text : i18n._(text)
  return translation
}
