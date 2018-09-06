const puppeteer = require('puppeteer')

const isDebugging = () => {
  let debugging_mode = {
    headless: false,
    slowMo: 25,
    devtools: false,
  }

  return process.env.NOJS && process.env.NOJS === 'debug'
    ? debugging_mode
    : { args: ['--no-sandbox'] }
}

let browser
let page
const baseUrl = 'http://localhost:3004'

const fr = false

const user_fr = {
  fullName: 'Dominique Henri',
  email: 'snc@exemple.com',
  paperFileNumber: '123456',
  explanation: "Voyage d'affaires!",
}

const user_en = {
  fullName: 'Leanne Graham',
  email: 'cdc@example.com',
  paperFileNumber: '123456',
  reason: 'workOrSchool',
  explanation: 'On business trip!',
  familyOption: 'Peter',
}

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  page.setJavaScriptEnabled(false)
  await page.goto(baseUrl)
})

describe('NoJS Flow Family Error check', () => {
  it(
    'Has error if family member checkbox is checked',
    async () => {
      let user = user_en

      if (fr) {
        user = user_fr
        await page.click('#language-toggle')
      }

      // landing page
      if (!fr) {
        const html = await page.$eval('h1', e => e.innerHTML)
        expect(html).toBe('Request a new citizenship appointment')
      }

      await page.click('main a')

      // register page
      const fullName = await page.$eval('#fullName-header', e => e.innerHTML)

      let label = 'Full name'

      if (fr) {
        label = 'Nom complet'
      }

      expect(fullName).toBe(label)
      await page.type('#fullName', user.fullName)
      await page.type('#paperFileNumber', user.paperFileNumber)
      await page.click('#familyCheck')
      await page.click('#reason-2')
      await page.type('#email', user.email)

      /* click check for error */
      await page.click('#register-form button')

      const familyOptionError = await page.$eval(
        '#familyOption-error',
        e => e.innerHTML,
      )
      expect(familyOptionError).toContain('You left this blank')
    },
    200000,
  )
})

afterAll(() => {
  if (browser && browser.close) {
    browser.close()
  }
})
