/* eslint-disable no-undef */
import { headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'

// Verify Items and functions on the review-page 
function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}
describe('should perform functions on the review page', () => {
    beforeEach(() => {
      cy.visit('/confirmation')
      cy.reload(true)
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      cy.url().should('contains', '/confirmation')
      checkA11y(cy)
    })
    it('should go to the landing page and show header image and links ', () => {  
      cy.get(headerImg).should('be.visible')
      cy.get(langLink).should('be.visible', 'Français')
  
     })
     it('should check footer info for links and canada image', () => {
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

    it('should error if any information is not dislayed on the page', () => {  
        cy.url().should('contains', '/confirmation') 
            //TODO: add more tests on the page text 
       
           })
      it('should show header steps ', () => {  
        cy.get('[role="banner"] > :nth-child(2)').should('be.visible')
          .and('contain.text', 'Thank you! Your request has been received.')
         
           })

    it('should show the text options and associated links on the page', () => { 
        // the confirmation number will need to be revisited once it's actually working 
        cy.get('#confirm-text').should('have.text', 'Confirmation #: A 0')

        cy.get('#bilNumber-header').should('contain', 'Application number')
        cy.get('#bilNumber-link > a').should('have.attr', 'href', '/register#paperFileNumber-label')
        cy.get('#email-address-header').should('contain', 'Email address')
        cy.get('#email-address-link > a').should('have.attr', 'href', '/register#email-label')
        cy.get('#a11y-header').should('contain', 'I need an accessible or private workstation')
        cy.get('#a11y-link > a').should('have.attr', 'href', '/register#accessibility-label')
        cy.get('#location-header').should('contain', 'Location')
        cy.get('#location-link > a').should('have.attr', 'href', '/selectProvince')
        cy.get('#date-header').should('contain', 'Day and time')
        cy.get('#date-link > a').should('have.attr', 'href', '/calendar#selectedDaysBox')
      
 
           })  
              

})