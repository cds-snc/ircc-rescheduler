/* eslint-disable security/detect-object-injection */
export const trimInput = obj => {
  const cleaned = {}
  Object.keys(obj).forEach(val => {
    let type = typeof obj[val]

    if (Array.isArray(obj[val])) {
      type = 'array'
    }

    switch (type) {
      case 'string':
        cleaned[val] = obj[val].trim()
        break
      case 'array':
        cleaned[val] = cleanArray(obj[val])
        break
      default:
        cleaned[val] = obj[val]
    }
  })

  return cleaned
}

export const cleanArray = arr => {
  const cleaned = arr.map(val => {
    if (typeof val === 'string') {
      return val.trim()
    }

    return val
  })

  return cleaned
}

export const deleteEmptyArrayKeys = obj => {
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key]) && obj[key].length === 0) {
      delete obj[key]
    }
  })
}
/* eslint-enable security/detect-object-injection */
