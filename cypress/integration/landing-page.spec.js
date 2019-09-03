/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { headerImg, langLink, contactLink, privacyLink, privacyHref, tocLink, footerImg } from './utils'
// verify items on the landing page. 

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('Items shown on the Landing page', () => {
  beforeEach(() => {
    cy.visit('/')
   
  })
  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    cy.injectAxe()
    checkA11y(cy)
  })
  
  it('should go to the landing page and show header image and links ', () => {  
    cy.url().should('contains', '/')
   cy.get(headerImg).should('be.visible')
    cy.get(langLink).should('be.visible', 'Français')

   })
   it('should check footer info for links and canada image', () => {
     cy.url().should('contains', '/')
    cy.get(contactLink).should('be.visible')
    cy.get(privacyLink).should('not.contain', 'Contact')
    cy.get(privacyHref).should('contain', 'Privacy')
    cy.get(tocLink).should('contain', 'Terms and Conditions')
     cy.get(footerImg).should('be.visible')
    })

  it('Start now button take the user to the register page', () => {
    cy.injectAxe()
      let startText = 'I Agree'
    cy.get('main a').should('contain.text', startText)
    cy.get('main a').click({ force: true })
   
    checkA11y(cy)
    cy.url().should('contain', '/register')
    })
})
  