import {
  baseUrl,
  clickAndWait,
  isDebugging,
  user_en,
  user_fr,
} from './puppeteer-config'

const puppeteer = require('puppeteer')

let browser
let page

const fr = false

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

      await clickAndWait(page, 'main a')

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
      await clickAndWait(page, '#register-form button')

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
