export const clickAndWait = async (page, selector, duration = 100) => {
  await page.click(selector)
  await page.waitFor(duration)
}
