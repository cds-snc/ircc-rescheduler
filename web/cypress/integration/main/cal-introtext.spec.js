/* When toggling the language the intro text Month name should be in the correct language. */
import { getStartMonthName } from '../../../src/utils/calendarDates'
import { getGlobalLocation } from '../../../src/locations'

context('Calendar intro text', () => {
  it('should show intro text in the correct language', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')

    /*
      `getStartMonthName` eventually calls `firstValidDay`,
      which will fail if there's no location object already set.

      When running the app normally, location is set based on the subdomain.
      All `getStartMonthName` calls within the app are fine.

      Given that `getStartMonthName` is being called outside of the app context,
      we have to manually pass in a location object, which we can do by
      manually passing one into `getGlobalLocation`.
    */
    getGlobalLocation(require('../../../src/locations/vancouver'))
    const monthEn = getStartMonthName(new Date(), 'en')
    const monthFr = getStartMonthName(new Date(), 'fr')

    cy.get('#calendar-intro').should('contain', `in ${monthEn}`)
    cy.get('#language-toggle').click({ force: true })
    cy.get('#calendar-intro').should('contain', `en ${monthFr}`)
  })
})
