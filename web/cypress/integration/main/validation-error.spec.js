context('Full Run-through including validation errors', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to trigger validation errors, recover, and reach the confirmation page with all of the submitted data', () => {
    cy.get('main a').should('have.text', 'Start now')
    cy.get('main a').click({ force: true })

    cy.fixture('user').then(data => {
      cy.get('#fullName').type(data.fullName, { force: true })
      // don't enter email or paper file number
      cy.get('#reason-2').click({ force: true })
      cy.get('#explanation').type(data.explanation, { force: true })
      cy.get('#register-form').submit({ force: true })
    })

    cy.get('#submit-error h2').should(
      'contain',
      'Some information is missing.',
    )
    cy.get('#submit-error ul li:first-of-type').should(
      'contain',
      'Email address',
    )
    cy.get('#submit-error ul li:last-of-type').should(
      'contain',
      'Paper file number',
    )

    cy.fixture('user').then(data => {
      cy.get('#email').type(data.email, { force: true })
      cy.get('#paperFileNumber').type(data.paperFileNumber, { force: true })
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

      cy.get('#calendar-form').submit({ force: true })

      // trigger the not enough days error
      cy.get('#submit-error h2').should(
        'contain',
        'You must select 3 days.',
      )

      cy.get('.DayPicker-Day[aria-disabled=false]')
        .eq(2)
        .click({ force: true })

      cy.get('#calendar-form').submit({ force: true })
    })

    cy.url().should('contain', '/review')

    cy.fixture('user').then(data => {
      cy.get('main').should('contain', data.fullName)
      cy.get('main').should('contain', data.email)
      cy.get('main').should('contain', data.paperFileNumber)
      cy.get('main').should('contain', data.explanation)
    })

    cy.get('#review-form').submit({ force: true })

    // should hit the confirm page now
    cy.url().should('contain', '/confirmation')
  })
})
