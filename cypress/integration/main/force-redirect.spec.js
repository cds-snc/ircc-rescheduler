context('Force redirect', () => {
  it('should not redirect on "not found" page', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004/not-found')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })

  it('should not redirect if not on 500 page', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004/500')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Something went wrong.')
  })

  it('should redirect to "not found" from root', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })

  it('should redirect to "not found" from root plus invalid path', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004/elephant')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })

  it('should redirect to "not found" from root plus UTM', () => {
    cy.visit(
      'http://rescheduler.vcap.me:3004?utm_source=BELA%20email&utm_medium=email',
    )
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })

  it("should force redirect if sub-domain isn't whitelisted", () => {
    cy.visit('http://test.rescheduler-dev.vcap.me:3004')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })
})
