/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to fill in a profile', () => {
    cy.get('main a span').should('have.text', 'Start now')
    cy.get('main a').click({ force: true })

    cy.fixture('user').then(data => {
      cy.get('#fullName').type(data.fullName, { force: true })
      cy.get('#email').type(data.email, { force: true })
      cy.get('#paperFileNumber').type(data.paperFileNumber, { force: true })
      cy.get('#reason-2').click({ force: true })
      cy.get('#explanation').type(data.explanation, { force: true })
      cy.get('#register-form').submit({ force: true })
    })

    cy.url().should('contain', '/calendar')

    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length

      if (count < 3) {
        cy.get('.DayPicker-NavButton--next').click({ force: true })
      }

      cy.get('.DayPicker-Day[aria-disabled=false]')
        .eq(0)
        .click({ force: true })
      cy.get('.DayPicker-Day[aria-disabled=false]')
        .eq(1)
        .click({ force: true })
      cy.get('.DayPicker-Day[aria-disabled=false]')
        .eq(2)
        .click({ force: true })

      cy.get('#cal-form').submit({ force: true })

      cy.url().should('contain', '/review')

      cy.fixture('user').then(data => {
        cy.get('main').should('contain', data.fullName)
        cy.get('main').should('contain', data.email)
        cy.get('main').should('contain', data.explanation)
      })

      cy.get('#review-form').submit({ force: true })

      // should hit the confirm page now
      cy.url().should('contain', '/confirmation')
    })
  })
})
