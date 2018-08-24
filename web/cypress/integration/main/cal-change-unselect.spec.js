/* When returning to the calendar that already has 3 selected days,
   the calendar does should allow days to be unselected. */

/* See Bug: https://github.com/cds-snc/ircc-rescheduler/pull/318 */

context('Calendar Dates unselect after review', () => {
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

    // select 3 days
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(0)
      .click({ force: true })
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(1)
      .click({ force: true })
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(2)
      .click({ force: true })

    // submit the form
    cy.get('#selectedDays-form').submit({ force: true })
    cy.visit('/calendar')

    cy.get('#removeDateMessage h2 span').should(
      'have.text',
      'To change your selections, remove some days first',
    )

    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(1)
      .click({ force: true })

    // test unselecting a day should now be 2
    cy.get('#selectedDays-list li .day-box:not(.empty)').then(el => {
      const count = el.length
      expect(count).eq(2)
    })
    //
  })
})
