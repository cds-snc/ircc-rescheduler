/*
  Helper method that checks to see if the i18n object is null or not, since it ends up being null 
  if the user refreshes the page. Returns normal english (i18n.t doesnt work and returns english) otherwise.
  The reason we have to sometimes use this method over say the <Trans> tag is that we need the text to be a string at compile time (it's a React object at compile time)
  */
export const translateText = (i18n, text) => {
  const translation = i18n === undefined ? text : i18n._(text)
  return translation
}
