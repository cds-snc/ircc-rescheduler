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

describe('NoJS Flow - no family check', () => {
  it(
    'Can do full run through in NoJS mode',
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
      await page.type('#email', user.email)
      await page.click('#reason-2')
      await page.type('#explanation', user.explanation)
      await clickAndWait(page, '#register-form button')

      // calendar page
      await page.waitForSelector('#calendar-header')

      let checkedValues = []

      for (let i = 1; i < 4; i++) {
        let el = `#calendar-checkboxes li:nth-child(${i}) input[type=checkbox]`
        let checkbox = await page.$(el)
        await checkbox.click()
        let checked = await page.evaluate(
          checkbox => checkbox.checked,
          checkbox,
        )

        const val = await page.evaluate((checkbox, checkedValues) => {
          return checkbox.value
        }, checkbox)

        checkedValues.push(val)

        expect(checked).toBe(true)
      }

      await clickAndWait(page, '#selectedDays-form button')

      // review page
      await page.waitForSelector('#review-header')
      const reviewPageHTML = await page.$eval('main', e => e.innerHTML)
      // -> check review page values
      expect(reviewPageHTML).toContain(user.fullName)
      expect(reviewPageHTML).toContain(user.email)
      expect(reviewPageHTML).toContain(user.explanation)
      expect(reviewPageHTML).toContain(checkedValues[2])
    },
    200000,
  )
})

afterAll(() => {
  if (browser && browser.close) {
    browser.close()
  }
})
