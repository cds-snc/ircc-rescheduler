context('500 page', () => {
  it('can load 500 page', () => {
    cy.visit('/500')

    cy.get('h1')
      .eq(0)
      .should('contain', 'Server error.')

    cy.get('#footer div a')
      .eq(0)
      .should('contain', 'Privacy')
    cy.get('#footer a')
      .eq(1)
      .should('contain', 'Terms and Conditions')
  })
})
