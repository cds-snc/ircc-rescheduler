const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=')
          // eslint-disable-next-line security/detect-object-injection
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : ''
          return params
        }, {})
    : {}
}

export const checkURLParams = (queryString, fields) => {
  const params = getQueryStringParams(queryString)
  let found = false
  Object.keys(params).forEach(key => {
    if (fields.includes(key)) {
      found = true
    }
  })

  return found
}
