/* eslint-disable no-undef */
/// <reference types="Cypress" />
// verify items on the landing page. 
describe('Items shown on the Landing page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
    it('should not have Privacy and ToC link but not contact', () => {
     // cy.visit('/')
      // there shoulc be no link for contact- it was removed. 
      cy.get('#footer div a')
        .eq(0)
        .should('not.contain', 'Contact')
      cy.get('#footer a')
        .eq(0)
        .should('contain', 'Privacy')
      cy.get('#footer div a')
        .eq(0).should('have.attr', 'href', '/privacy')
        // todo, check the privacy link text once complete
      cy.get('#footer a')
        .eq(1)
        .should('contain', 'Terms and Conditions')
        //need the link for the terms and conditions
    //  cy.get('#footer div a')
    //    .eq(2).should('have.attr', 'href', '/termsandconditions')
  })
    it('should have header and footer canada svg', () => {
    cy.get('.svg-container').eq(1).should('be.visible')
    cy.get('.css-1e5qbzj-baseSVG-engSVG').should('be.visible')
  })

  it('should have link for changing the language', () => {
    cy.get('#language-toggle').should('be.visible', 'Français')
  })

  it('Start now button take the user to the register page', () => {
      let startText = 'Start now'
    cy.get('main a').should('have.text', startText)
    cy.get('main a').click({ force: true })
    cy.url().should('contain', '/register')
    })
})
  