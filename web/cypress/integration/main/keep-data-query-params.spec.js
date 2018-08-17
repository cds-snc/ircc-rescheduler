context('Keep user submitted data around', () => {
  it('when not-relevant query parameters are submitted', () => {
    cy.visit('/register')

    cy.fixture('user').then(data => {
      cy.get('#fullName').type(data.fullName, { force: true })
      cy.get('#email').type(data.email, { force: true })
      cy.get('#paperFileNumber').type(data.paperFileNumber, { force: true })
      cy.get('#reason-2').click({ force: true })
      cy.get('#explanation').type(data.explanation, { force: true })
      cy.get('#register-form').submit({ force: true })
    })
    cy.url().should('contain', '/calendar')
    // click "Go back" link
    cy.get('main nav a.chevron-link').click({ force: true })
    cy.url().should('contain', '/register')

    // Make sure data is still on the page
    cy.fixture('user').then(data => {
      cy.get('#fullName').should('have.value', data.fullName)
      cy.get('#email').should('have.value', data.email)
      cy.get('#paperFileNumber').should('have.value', data.paperFileNumber)
      cy.get('#explanation').should('have.value', data.explanation)
    })

    // Visit same page with additional query parameter
    cy.visit('/register?not-valid=true')
    // Make sure data is still on the page
    cy.fixture('user').then(data => {
      cy.get('#fullName').should('have.value', data.fullName)
      cy.get('#email').should('have.value', data.email)
      cy.get('#paperFileNumber').should('have.value', data.paperFileNumber)
      cy.get('#explanation').should('have.value', data.explanation)
    })
  })
})
