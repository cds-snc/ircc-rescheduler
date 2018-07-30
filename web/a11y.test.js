const pa11y = require('pa11y')
const baseUrl = 'http://localhost:3004'
const options = {
  log: {
    debug: console.log,
    error: console.error,
    info: console.log,
  },
}
const registerActions = [
  'set field #fullName to John Doe',
  'click element main button',
]

/*--------------------------------------------*
 * List of urls we want to visit
 *--------------------------------------------*/

const visit = [
  { url: '/' },
  { url: '/register', registerActions },
  { url: '/calendar' },
  { url: '/review' },
]

async function run() {
  try {
    const results = await Promise.all(
      visit.map(page => {
        return pa11y(baseUrl + page['url'], {
          ...options,
          ...{ actions: page['actions'] ? page['actions'] : [] },
        })
      }),
    )

    results.map(result => {
      if (result && result.issues && result.issues.length >= 1) {
        console.log(result)
      }
    })
  } catch (error) {
    // Output an error if it occurred
    console.error(error.message)
  }
}

run()
