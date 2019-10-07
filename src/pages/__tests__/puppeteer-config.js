export const baseUrl = 'http://localhost:3004'

export const isDebugging = () => {
  let debugging_mode = {
    headless: false,
    slowMo: 25,
    devtools: false,
  }

  return process.env.NOJS && process.env.NOJS === 'debug'
    ? debugging_mode
    : { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
}

export const user_fr = {
  fullName: 'Dominique Henri',
  email: 'snc@exemple.com',
  paperFileNumber: '123456',
  explanation: "Voyage d'affaires!",
}

export const user_en = {
  fullName: 'Leanne Graham',
  email: 'cdc@example.com',
  paperFileNumber: '123456',
  reason: 'workOrSchool',
  explanation: 'On business trip!',
}

export const clickAndWait = async (page, selector, duration = 1000) => {
  await page.click(selector)
  await page.waitFor(duration)
}
