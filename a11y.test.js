const pa11y = require('pa11y')
const baseUrl = 'http://localhost:3004'

const options = {
  log: {
    debug: console.log,
    error: console.error,
    info: console.log,
  },
  chromeLaunchConfig: {
    args: ['--no-sandbox'], // pass sandbox flag for ci
  },
  hideElements: '.canada-flag',
  ignore: ['WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Span.Name'],
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
  { url: '/register', actions: registerActions },
  { url: '/calendar' },
  { url: '/review' },
  { url: '/confirmation' },
  { url: '/confirmation/error' },
  { url: '/cancel' },
  { url: '/error' },
  { url: '/404' },
  { url: '/500' },
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

    let issues = []
    results.map(result => {
      if (result && result.issues && result.issues.length >= 1) {
        console.log(result)
        issues.push(result)
      }
    })

    if (issues.length >= 1) {
      //process.exit(issues)
      const count = issues.length
      throw new Error(`Found ${count} page(s) with issues`)
    }
  } catch (error) {
    // Output an error if it occurred
    console.error('\n\n' + error.message + '\n\n')
    process.exit(1)
  }
}

run()
