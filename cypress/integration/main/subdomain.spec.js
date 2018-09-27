import calgary from '../../../src/locations/calgary'
import vancouver from '../../../src/locations/vancouver'

context('Subdomain checks', () => {
  it('should be show correct email for calgary', () => {
    cy.visit('http://calgary.vcap.me:3004/cancel?language=en')
    cy.get('#email').should('have.text', calgary.email)
  })

  it('should be show correct email for vancouver', () => {
    cy.visit('http://vancouver.vcap.me:3004/cancel?language=en')
    cy.get('#email').should('have.text', vancouver.email)
  })

  it('should be show correct email for vancouver base domain', () => {
    cy.visit('http://vcap.me:3004/cancel?language=en')
    cy.get('#email').should('have.text', vancouver.email)
  })
})
