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
    it('should go to the landing page and steps in header', () => {  
      cy.get('[role="banner"] > :nth-child(2)').should('be.visible')
      .and('contain.text', 'Request an appointment for fingerprints and photo (biometrics)')
   
     })

    it('should verify text on the page', () => {  
      cy.get('#needed-info').should('contain.text', 'You will need')
      cy.get('section').should('contain.text', 'Your Application number')
      cy.get(':nth-child(2) > p').should('contain.text', 'A valid email address')
      cy.get('.css-q22mxi-CalendarIcon').should('be.visible')
      // text needs to be update to take out the abreviations
     // cy.get('#message-container > p').should('have.text', 'Next, you will select a location, day and time you are available with the next 30 days')
      cy.get('#privacy-notice').should('contain.text', 'Privacy notice')
      // needs to be updated with actual notice text
      cy.get('section > :nth-child(5)').should('contain.text', 'Lorem')
   
     })

   it('should verify the Privacy Notice default and errors and seleted state', () => {
    cy.injectAxe()
      // verify the box is located on the page and by default not selected
    cy.get('#policyCheck').should('be.visible').and('not.be.selected')
    cy.get('#policyCheck-label').should('contain.text', 'I have read and accept the privacy policy')
     // verify error message shown if box not checked
     cy.get('#start-request').click({ force: true })
     cy.get('#submit-error').should('contain.text', 'Some information is missing')
     cy.get('#submit-error').should('contain.text', 'Please check these sections for errors:')
     cy.get('li > a').should('be.visible').and('contain.text', 'Policy Check')
     cy.get('#policy-error').should('contain.text', 'In order to start your request,')     
     // Privacy policy error link
     cy.get('li > a').click()
     cy.window().then(($window) => {
        expect($window.scrollY).to.be.closeTo(600, 200);
   })
     // verify that the box can be checked
     cy.get('#policyCheck').click()
     cy.get('#policyCheck').should('be.visible').and('be.checked')
   //  cy.get('#policy-error').should('not.be.visible')
       checkA11y(cy)
     
     })

  it('should go to register page on accept policy and Start request', () => {
    cy.get('#policyCheck').click()
    cy.get('#start-request').should('contain.text', 'Start request')
    cy.get('#start-request').click({ force: true })
    cy.url().should('contain', '/register')
    })
})
  