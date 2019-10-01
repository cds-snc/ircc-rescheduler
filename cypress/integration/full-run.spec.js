/* eslint-disable no-undef */
import { nextButton, enterButton, headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'

// Verify Items and functions on the full run page
function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('should perform functions on the review page', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.reload(true)
    })

    
  it.only('Should pass the data from register, location and calendar to the review page', () => {
    cy.injectAxe()

  
      // check the accept privacy notice box
    cy.get('#policyCheck').click()
      //click to move to the register page
    cy.get('#start-request').click({ force: true })
    cy.url().should('contain', '/register')
    checkA11y(cy)
    //enter in values on register page
    cy.fixture('user').then(data => {
        cy.get('#paperFileNumber').type(data.bilNumber, { force: true })
        cy.get('#email').type(data.email, { force: true })
        cy.get('#emailConfirm').type(data.email, { force: true })
        cy.get(nextButton).click()
        cy.url().should('contain', '/selectProvince')
    })
    // select a location
    cy.get('#ProvinceList').should('contains.text', 'Select a Province')
    cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
    cy.get('#CitiesList').should('contain.text', 'Select a city')
    cy.get('select[name="CitiesList"]').select('Edmonton').should('have.value', 'Edmonton')
    // cy.get('input[type="radio"]').click()
    cy.get('#4601').click()
    cy.get(nextButton).click()
    cy.url().should('contain', '/calendar')
  
    //select a date and time
        // compare today's actual date with the Day--today
    //     const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')

       
    //    cy.get(nextButton).click()
    //    cy.url().should('contains', '/review')
    

    //verify the values appear on the review page





    })

})