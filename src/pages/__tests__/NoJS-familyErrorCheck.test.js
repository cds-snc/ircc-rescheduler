import {
  baseUrl,
  isDebugging,
  user_en,
  user_fr,
  clickAndWait,
} from './puppeteer-config'

const puppeteer = require('puppeteer')
let browser
let page

const fr = false

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  page.setJavaScriptEnabled(false)
})

describe('NoJS Flow Family Error check 1', () => {
  it('Has error if family member checkbox is checked but textarea is empty', async () => {
    await page.goto(`${baseUrl}/clear`)
    await page.goto(`${baseUrl}/register`)

    let user = user_en

    if (fr) {
      user = user_fr
      await page.click('#language-toggle')
    }

    // register page
    if (!fr) {
      const html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toEqual('First, provide some basic information:')
    }

    const fullName = await page.$eval('#fullName-header', e => e.innerHTML)

    let label = 'Full name'

    if (fr) {
      label = 'Nom complet'
    }

    expect(fullName).toBe(label)

    /* There is a familyCheck value but nothing for familyOption */
    expect(fullName).toBe(label)
    await page.type('#fullName', user.fullName)
    await page.type('#email', user.email)
    await page.type('#paperFileNumber', user.paperFileNumber)
    await page.click('#familyCheck')
    // await page.type('#familyOption', user.familyOption)
    await page.click('#reason-2')
    await page.type('#explanation', user.explanation)
    await clickAndWait(page, '#register-form button')

    /* check for error */
    const familyOptionError = await page.$eval(
      '#familyOption-error',
      e => e.innerHTML,
    )
    expect(familyOptionError).toContain('You left this blank')
  }, 200000)
})

describe('NoJS Flow Family Error check 2', () => {
  it('Has error if family member checkbox is NOT checked but textarea has a value', async () => {
    await page.goto(`${baseUrl}/clear`)
    await page.goto(`${baseUrl}/register`)

    let user = user_en

    if (fr) {
      user = user_fr
      await page.click('#language-toggle')
    }

    // register page
    if (!fr) {
      const html = await page.$eval('h1', e => e.innerHTML)
      expect(html).toEqual('First, provide some basic information:')
    }

    const fullName = await page.$eval('#fullName-header', e => e.innerHTML)

    let label = 'Full name'

    if (fr) {
      label = 'Nom complet'
    }

    /* There is a familyOption value but nothing for familyCheck */
    expect(fullName).toBe(label)
    await page.type('#fullName', user.fullName)
    await page.type('#email', user.email)
    await page.type('#paperFileNumber', user.paperFileNumber)
    // await page.click('#familyCheck')
    await page.type('#familyOption', user.familyOption)
    await page.click('#reason-2')
    await page.type('#explanation', user.explanation)
    await clickAndWait(page, '#register-form button')

    const familyCheckError = await page.$eval(
      '#familyCheck-error',
      e => e.innerHTML,
    )
    expect(familyCheckError).toContain(
      'You must click ‘I need to reschedule my family too’',
    )
  }, 200000)
})

afterAll(() => {
  if (browser && browser.close) {
    browser.close()
  }
})
