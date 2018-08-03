/* When submitting <3 days submitting than selecting too many days
   errors should clear and show the appropriate message
*/

/* See Bug: https://github.com/cds-snc/ircc-rescheduler/pull/302 */

context('Calendar Errors clear when selecting incorrect amount of days', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to select and unselect dates', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')
    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length
      // make sure we're on a month that has 3 selectable days
      if (count < 3) {
        cy.get('.DayPicker-NavButton--next').click({ force: true })
      }
    })

    // select 2 days
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(0)
      .click({ force: true })
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(1)
      .click({ force: true })

    // submit the form
    cy.get('#selectedDays-form').submit({ force: true })

    // trigger the not enough days error
    cy.get('#submit-error h2 span').should('contain', 'You must select 3 days.')

    // try to select some more days
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(2)
      .click({ force: true })

    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(3)
      .click({ force: true })

    // this should trigger the too many days error
    cy.get('#selectedDays-error h2 span')
      .should('be.visible')
      .should('contain', 'You can’t select more than 3 days.')

    cy.get('#submit-error').should('not.be.visible')
  })
})
