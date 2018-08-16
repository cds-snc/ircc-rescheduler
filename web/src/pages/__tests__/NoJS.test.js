const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 8']

const isDebugging = () => {
  let debugging_mode = {
    headless: false,
    slowMo: 25,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let browser
let page
const baseUrl = 'http://localhost:3004'

const user = {
  fullName: 'Leanne Graham',
  email: 'cdc@example.com',
  paperFileNumber: '123456',
  reason: 'workOrSchool',
  explanation: 'On business trip!',
}

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto(baseUrl)
  await page.emulate(iPhone)
  page.setJavaScriptEnabled(false)
})

describe('NoJS Flow', () => {
  it(
    'Can do full run through in NoJS mode',
    async () => {
      // landing page
      const html = await page.$eval('h1 span', e => e.innerHTML)
      expect(html).toBe('Request a new citizenship appointment')
      await page.click('main a')

      // register page
      const fullName = await page.$eval(
        '#fullName-header span',
        e => e.innerHTML,
      )
      expect(fullName).toBe('Full name')
      await page.type('#fullName', user.fullName)
      await page.type('#email', user.email)
      await page.type('#paperFileNumber', user.paperFileNumber)
      await page.click('#reason-2')
      await page.type('#explanation', user.explanation)
      await page.click('#register-form button')

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

      await page.click('#selectedDays-form button')

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
  browser.close()
})
