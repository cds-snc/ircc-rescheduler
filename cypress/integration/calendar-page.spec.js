/* eslint-disable no-undef */
import { headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'

// Verify Items and functions on the calendar page. 

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('Calendar page functions', () => {
    beforeEach(() => {
      cy.visit('/calendar')
    })
    
    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      cy.url().should('contains', '/calendar')
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
  
    // This needs to be updated for the text TBD
    it('should do something', () => {  
     cy.url().should('contains', '/calendar')
     cy.get('#calendar-header').should('contains.text', 'Select a day')
    })

    xit('should find selectable days', () => {  
      cy.url().should('contains', '/calendar')
      cy.get('#calendar-header').should('contains.text', 'Select a day')

      // trying to compare today's actual date with the Day--today
       const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')
      // cy.get('.DayPicker-Day--today').should(($date) => {
      // expect($date.eq(0)).to.contain(todaysDate)
      // })
      cy.get('.DayPicker-Day--today').click()
      cy.get('.DayPicker-Day--selected').should('be.visible')
      cy.get('.css-ex3iit-daySelection-mediaQuery-daySelection').should('contain.text', 'Please select your time slot:')
      cy.get('time').should('contain', todaysDate)


    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length
      expect(count).eq(15)
      // make sure we're on a month that has 3 selectable days
     // if (count <= 30) {

       // cy.get('.DayPicker-NavButton--next').click({ force: true })
   //   }
    })
  })

});