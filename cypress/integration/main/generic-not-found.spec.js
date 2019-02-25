context('Contact link on Not Found (404) page', () => {
  it('should not have contact link', () => {
    cy.visit('/not-found')
    cy.get('#footer div a')
      .eq(0)
      .should('contain', 'Privacy')
    cy.get('#footer a')
      .eq(1)
      .should('contain', 'Terms and Conditions')
  })

  it('should have a contact link', () => {
    cy.visit('/some page')
    cy.get('#footer div a')
      .eq(0)
      .should('contain', 'Contact')
    cy.get('#footer a')
      .eq(1)
      .should('contain', 'Privacy')
  })
})
