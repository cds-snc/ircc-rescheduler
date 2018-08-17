context('Review Page with Missing Data', () => {
  it('should be redirected to register page if data is missing', () => {
    cy.visit('/review')
    // submit with no data filled in
    cy.get('#review-form').submit({ force: true })

    // should hit the register page with a query param set
    cy.url().should('contain', '/register?not-valid')
  })

  it('should be redirected to calendar page if data is missing', () => {
    cy.visit('/register')

    // fill in first page with data
    cy.fixture('user').then(data => {
      cy.get('#fullName').type(data.fullName, { force: true })
      cy.get('#email').type(data.email, { force: true })
      cy.get('#paperFileNumber').type(data.paperFileNumber, { force: true })
      cy.get('#reason-2').click({ force: true })
      cy.get('#explanation').type(data.explanation, { force: true })
      cy.get('#register-form').submit({ force: true })
    })

    cy.url().should('contain', '/calendar')

    // jump to the review page simulating reaching that page with missing calendar data
    cy.visit('/review')
    // submit with no data filled in
    cy.get('#review-form').submit({ force: true })

    // should hit the register page with a query param set
    cy.url().should('contain', '/calendar?not-valid')
  })
})
