/* When toggling the language the inrto text Month name should be in the correct language. */

import { getStartMonthName } from '../../../src/utils/calendarDates'

context('Calendar intro text', () => {
  it('should show intro text in the correct language', () => {
    cy.visit('/calendar')

    cy.url().should('contain', '/calendar')
    const monthEn = getStartMonthName(new Date(), 'en')
    const monthFr = getStartMonthName(new Date(), 'fr')
    cy.get('#calendar-intro').should('contain', `in ${monthEn}`)
    cy.get('#language-toggle').click({ force: true })
    cy.get('#calendar-intro').should('contain', `dans ${monthFr}`)
  })
})
