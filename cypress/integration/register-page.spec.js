/* eslint-disable no-undef */
// Verify Items and functions on the register page - BIL # - email and radio button.
import { headerImg, langLink, contactLink, privacyLink, privacyHref, tocLink, footerImg, homeLink, enterButton } from './utils'

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",    
    values: ["wcag2a", "wcag2aa"]}});
}

describe('Register page functions', () => {
    beforeEach(() => {
      cy.visit('/register')
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      checkA11y(cy)
    })

    it('should go to the selectProvince page and show header info', () => {  
      cy.url().should('contains', '/register')
     cy.get(headerImg).should('be.visible')
      cy.get(langLink).should('be.visible', 'Français')
 
     })
     it('should check footer info', () => {
       cy.url().should('contains', '/register')
      cy.get(contactLink).should('be.visible')
      cy.get(privacyLink).should('not.contain', 'Contact')
      cy.get(privacyHref).should('contain', 'Privacy')
      cy.get(tocLink).should('contain', 'Terms and Conditions')
       cy.get(footerImg).should('be.visible')
      })
    
    it('should have header and footer canada svg', () => {
        cy.get('.svg-container').eq(1).should('be.visible')
        cy.get('.css-1e5qbzj-baseSVG-engSVG').should('be.visible')
       
      })
      it('should have Home link breadcrumb', () => {
        cy.get(homeLink).should('be.visible')
      })

      it('should have BIL number and email address entry boxes', () => {
        cy.get('#paperFileNumber-header').should('be.visible').and('contain.text', 'BIL file number')
        cy.get('#paperFileNumber-details').should('contains.text', 'This number')
        cy.get('#paperFileNumber').should('be.enabled')
        cy.get('#email-header').should('be.visible').and('contain.text', 'Email address')
        cy.get('#email-details').should('contains.text', 'Please enter your email address.')
        cy.get('#email').should('be.enabled')
        cy.get('#confirm-email-header').should('be.visible').and('contain.text', 'Confirm Email address')
        cy.get('#confirm-email-details').should('contains.text', 'Please re-enter your email for confirmation.')
        cy.get('#emailConfirm').should('be.enabled')
        cy.get(enterButton).should('be.enabled').and('be.visible')

      })
      it('should show error messages for empty entries', () => {
        cy.injectAxe()
        
        cy.get(enterButton).click()
        cy.get('div > h2').should('be.visible').and('contain.text', 'Some information is missing')
        cy.get('p').should('contain.text', 'Please check these sections for errors:')
        cy.get('ul > :nth-child(1) > a').should('contain.text', 'Email address')
        cy.get('ul > :nth-child(2) > a').should('contain.text', 'Confirm Email address')
        cy.get('ul > :nth-child(3) > a').should('contain.text', 'BIL file number')
        cy.get('#paperFileNumber-error').should('be.visible')
          .and('contain.text', 'We need your BIL file number so we can confirm your identity.')
        cy.get('#email-error').should('contains.text', 'We need your email address.')
        cy.get('#email-Confirm-error').should('contain.text', 'Please re-enter your email address.')
        checkA11y(cy)     
       })

      it('should show error message for incorrect BIL number', () => {
        cy.injectAxe()
        cy.fixture('user').then(data => {
          cy.get('#paperFileNumber').type(data.wrongFileNumber, { force: true })
          cy.get('#email').type(data.email, { force: true })
          cy.get('#emailConfirm').type(data.email, { force: true })
          cy.get(enterButton).click()
          cy.get('#paperFileNumber-error').should('be.visible')
          .and('contain.text', 'BIL file number requires 1 letter and 12 digits.')
          cy.get('li > a').should('contain.text', 'BIL file number')
          checkA11y(cy)
        })})


      it('should show error message for incorrect email address format', () => {
        cy.fixture('user').then(data => {
          cy.get('#paperFileNumber').type(data.bilNumber, { force: true })
          cy.get('#email').type(data.emailIncorrectFormat, { force: true })
          cy.get('#emailConfirm').type(data.emailIncorrectFormat, { force: true })
          cy.get(enterButton).click()
          cy.get('#email-error')
          .should('contain.text', 'Please make sure you provide a valid email address. For example, ‘yourname@example.com’')
          cy.get('#email-Confirm-error')
          .should('contain.text', 'Must be a valid email address.') 
          cy.get('ul > :nth-child(1) > a').should('contain.text', 'Email address')
          cy.get('ul > :nth-child(2) > a').should('contain.text', 'Confirm Email address')  
        })})

        it('should show error message for non matching email address', () => {
          cy.fixture('user').then(data => {
            cy.get('#paperFileNumber').type(data.bilNumber, { force: true })
            cy.get('#email').type(data.email, { force: true })
            cy.get('#emailConfirm').type(data.emailIncorrectMatch, { force: true })
            cy.get(enterButton).click()
            cy.get('#email-error')
            .should('not.be.visible')
            cy.get('#email-Confirm-error')
            .should('contain.text', 'Email does not match. Please re-enter matching email.')
            cy.get('li > a').should('contain.text', 'Confirm Email address')   
          })})

          it.only('should scroll on error message click', () => {
            cy.injectAxe()
            cy.fixture('user').then(data => {
              cy.get('#paperFileNumber').type(data.wrongFileNumber, { force: true })
              cy.get('#email').type(data.emailIncorrectFormat, { force: true })
              cy.get('#emailConfirm').type(data.emailIncorrectMatch, { force: true })
              cy.get(enterButton).click()
                // BIL number click
                cy.get('ul > :nth-child(3) > a').click()
                cy.window().then(($window) => {
                  expect($window.scrollY).to.be.closeTo(370, 200);
                })
                cy.get('#paperFileNumber-error').should('be.visible')
                checkA11y(cy)
                // Email address error link
              cy.get('ul > :nth-child(1) > a').click()
              cy.window().then(($window) => {
                expect($window.scrollY).to.be.closeTo(560, 200);
              })
              checkA11y(cy)
              cy.get('#email-error')
              .should('contain.text', 'Please make sure you provide a valid email address. For example, ‘yourname@example.com’')
            // confirm email address error link
              cy.get('ul > :nth-child(2) > a').click()
             cy.window().then(($window) => {
              expect($window.scrollY).to.be.closeTo(687, 200);
            })
            checkA11y(cy)
              cy.get('#email-Confirm-error')
              .should('contain.text', 'Email does not match. Please re-enter matching email.')
          
           
            })})

          it('should move to calendar page with successful entires.', () => {
            cy.injectAxe()
            cy.fixture('user').then(data => {
              cy.get('#paperFileNumber').type(data.bilNumber, { force: true })
              cy.get('#email').type(data.email, { force: true })
              cy.get('#emailConfirm').type(data.email, { force: true })
              cy.get('#email-error').should('not.be.visible')  
              cy.get(enterButton).click()
              checkA11y(cy)
            })})
          
    
        // // Make sure data is still on the page - from the select province page. 
        // cy.fixture('user').then(data => {
    //   cy.get('#paperFileNumber').should('have.value', data.bilNumber)
        //   cy.get('#email').should('have.value', data.email)
      //   cy.get('#emailConfirm').should('have.value', data.email)
      //  })
      

})