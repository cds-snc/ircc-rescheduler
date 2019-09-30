import { logError, logDebug } from "../utils/logger";
//
//  Usage contacts the server
//

export function ApiFetch(encodedURI) {
  logDebug(encodedURI)

  // eslint-disable-next-line no-undef
  return fetch(encodedURI)
    .then(data => data.json())
    .then(locs => locs)
    .catch(error => {
      logError(error)
      return null
    })
}
