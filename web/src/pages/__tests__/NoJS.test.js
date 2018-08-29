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
}

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  page.setJavaScriptEnabled(false)
  await page.goto(baseUrl)
})

describe('NoJS Flow', () => {
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

      await page.click('main a')

      // register page
      const fullName = await page.$eval(
        '#fullName-header',
        e => e.innerHTML,
      )

      let label = 'Full name'

      if (fr) {
        label = 'Nom complet'
      }

      expect(fullName).toBe(label)
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

describe('NoJS Landing Page', () => {
  it(
    'preserves language settings in nojs mode',
    async () => {
      await page.goto(`${baseUrl}/`)
      let html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toBe('Request a new citizenship appointment')

      await page.goto(`${baseUrl}/?language=fr`)
      html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toBe(
        'Demander un nouveau rendez-vous d’examen de citoyenneté',
      )

      await page.goto(`${baseUrl}/`)
      html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toBe(
        'Demander un nouveau rendez-vous d’examen de citoyenneté',
      )

      await page.goto(`${baseUrl}/?utm_source=TEST&utm_medium=test`)
      html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toBe(
        'Demander un nouveau rendez-vous d’examen de citoyenneté',
      )
    },
    200000,
  )
})

afterAll(() => {
  if (browser && browser.close) {
    browser.close()
  }
})
