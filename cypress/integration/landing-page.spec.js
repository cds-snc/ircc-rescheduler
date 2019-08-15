/// <reference types="Cypress" />

describe('Items shown on the Landing page', () => {
    it('should not have contact, Privacy and ToC link', () => {
      cy.visit('/')
      // this may need to be removed if there is no link for contact. 
      cy.get('#footer div a')
        .eq(0)
        .should('contain', 'Contact')
    
      cy.get('#footer a')
        .eq(1)
        .should('contain', 'Privacy')
      cy.get('#footer div a')
        .eq(1).should('have.attr', 'href', '/privacy')
      cy.get('#footer a')
        .eq(2)
        .should('contain', 'Terms and Conditions')
        //need the link for the terms and conditions
    //  cy.get('#footer div a')
    //    .eq(2).should('have.attr', 'href', '/termsandconditions')

    cy.get('.svg-container').eq(1).should('be.visible')

    cy.get('#language-toggle').should('be.visible', 'Français')
    cy.get('.css-1e5qbzj-baseSVG-engSVG').should('be.visible')
    })
})
  