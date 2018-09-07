import { baseUrl, isDebugging } from './puppeteer-config'

const puppeteer = require('puppeteer')

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  page.setJavaScriptEnabled(false)
  await page.goto(baseUrl)
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
