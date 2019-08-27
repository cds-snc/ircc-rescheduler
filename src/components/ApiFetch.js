
//  
//  Usage contacts the server 
//

export function ApiFetch (encodedURI) {

  // eslint-disable-next-line no-console
  console.log( "url: " + encodedURI )
  // eslint-disable-next-line no-undef
  return fetch(encodedURI)
    .then( (data) => data.json() )
    .then( (locs) => locs )
    .catch( (error) => {
      // eslint-disable-next-line no-console
      console.warn(error)
      return null
    } );
}
    

