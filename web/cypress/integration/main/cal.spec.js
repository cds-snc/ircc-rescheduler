context('Calendar Date selections', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to select and unselect dates', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')

    //
    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length

      if (count < 3) {
        cy.get('.DayPicker-NavButton--next').click({ force: true })
      }

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

      // click again on the third date to leave 2 selected
      cy.get('.DayPicker-Day[aria-disabled=false]')
        .eq(2)
        .click({ force: true })

      // check the selected day count
      cy.get('#selectedDays-list li').then(el => {
        const count = el.length
        expect(count).eq(2)
      })

      cy.get('#selectedDays-list li')
        .eq(1)
        .find('button')
        .click({ force: true })

      // check the selected day count
      cy.get('#selectedDays-list li').then(el => {
        const count = el.length
        expect(count).eq(1)
      })
    })

    // submit the form with not enough dates selected
    cy.get('#selectedDays-form').submit({ force: true })

    cy.get('#fewerDays-error').should('be.visible')

    cy.get('#fewerDays-error').should('contain', '2 more days to continue')
  })
})
