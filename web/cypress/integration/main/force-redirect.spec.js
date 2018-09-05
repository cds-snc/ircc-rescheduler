context('Force redirect', () => {
  it('should force not redirect if on "not found" page', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004/not-found')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Page not found.')
  })

  it('should force not redirect if not on 500 page', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004/500')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Server Error.')
  })

  it.skip('should force redirect from "local" dev server', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004')
    cy.url().should('include', 'vancouver')
  })

  it.skip('should force redirect from "local" live server', () => {
    cy.visit('http://rescheduler-dev.vcap.me:3004')
    cy.url().should('include', 'vancouver')
  })

  it.skip('should force redirect from "local" live server with UTM', () => {
    cy.visit(
      'http://rescheduler.vcap.me:3004?utm_source=BELA%20email&utm_medium=email',
    )
    cy.url().should('include', 'vancouver')
  })

  it.skip("should force redirect if sub-domain isn't whitelisted", () => {
    cy.visit('http://test.rescheduler-dev.vcap.me:3004')
    cy.get('h1')
      .eq(0)
      .should('contain', 'Server Error.')
  })
})
