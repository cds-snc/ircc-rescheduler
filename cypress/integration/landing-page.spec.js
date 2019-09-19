/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'
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
    cy.url().should('contains', '/')
     checkA11y(cy)
  })
  
  it('should go to the landing page and show header image and links ', () => {  
    cy.get(headerImg).should('be.visible')
    cy.get(langLink).should('be.visible', 'Français')

   })
   it('should check footer info for links and canada image', () => {
    cy.url().should('contains', '/')
    cy.get(aboutCA).should('be.visible').and('contain', 'About Canada.ca')
    cy.get(sMedia).should('be.visible').and('contain', 'Social media')
    cy.get(mobileApp).should('be.visible').and('contain', 'Mobile applications')
    cy.get(tocLink).should('contain', 'Terms and Conditions')
    cy.get(privacyLink).should('contain', 'Privacy')
   
    cy.get(aboutCAHref).should('have.attr', 'href', 'https://www.canada.ca/en/government/about.html')
    cy.get(sMediaHref).should('have.attr', 'href', 'https://www.canada.ca/en/social.html')
    cy.get(mobileHref).should('have.attr', 'href', 'https://www.canada.ca/en/mobile.html')
    cy.get(tocHref).should('have.attr', 'href', 'https://digital.canada.ca/legal/terms/')
    cy.get(privacyHref).should('have.attr', 'href', '/privacy')
    
     cy.get(footerImg).should('be.visible')
    })
    it.only('should go to the landing page and show header image and links ', () => {  
      cy.get('[role="banner"] > :nth-child(2)').should('be.visible')
      .and('contain.text', 'Request an appointment for fingerprints and photo (biometrics)')
   
     })
 
  it('Start now button take the user to the register page', () => {
    cy.get('main a').should('contain.text', 'Start request')
    cy.get('main a').click({ force: true })
    cy.url().should('contain', '/register')
    })
})
  