const puppeteer = require('puppeteer')

puppeteer.launch().then(async browser => {
  const page = await browser.newPage()
  page.setJavaScriptEnabled(false)
  await page.goto('http://localhost:3004/calendar')

  

  // await page.click('.day-check input[type=checkbox]'),
  const selector_child = '.day-check input[type=checkbox]'
  //const selector_child  = `#selectedDays-09-0`;
   const checkbox = await page.$(selector_child);
   await checkbox.click();
    const checked = await page.evaluate(checkbox => checkbox.checked, checkbox);
    console.log(`${selector_child} is checked`, checked);
 
    await page.screenshot({ path: 'screenshot.png' })
  await browser.close()
})
