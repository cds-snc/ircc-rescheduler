/* eslint-disable no-undef */
import { enterButton, headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref,footerImg } from './utils'

// Verify Items and functions on the select location, and office page. 
function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}
describe('select provice, city and office page functions', () => {
    beforeEach(() => {
      cy.visit('/selectProvince')
      cy.reload(true)
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      checkA11y(cy)
    })
  
    it('should go to the landing page and show header image and links ', () => {  
      cy.url().should('contains', '/selectProvince')
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
 

    it('should click into the province selection dropdown and show Select a City dropdown', () => {  
      cy.injectAxe()
      cy.get('#ProvinceList').should('contains.text', 'Select a Province')
       checkA11y(cy)
      cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
      cy.get('#CitiesList').should('contain.text', 'Select a city')
      cy.get('select[name="CitiesList"]').select('Edmonton').should('have.value', 'Edmonton')

     })

     it.only('should click into the Select a City dropdown and show city and locations and button ', () => {  
      cy.injectAxe()
      cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
      cy.get('select[name="CitiesList"]').select('xsrwrQ').should('have.value', 'xsrwrQ')
     
      cy.get('[for="OfficeList"]').should('contains.text', 'Locations in:')
      cy.get('[for="OfficeList"]').should('contain.text', 'xsrwrQ')
      cy.get(enterButton).should('be.visible')
      cy.get('input[name="OfficeList"]').should('not.be.enabled')
      cy.get('#8').click()
      cy.get('input[name="OfficeList"]').should('be.enabled')
      cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
       checkA11y(cy)
 
     })
     
     it('should find Alberta and the cities in the dropdown', () => {  
       // Alberta - Edomonton - checked in previous test - Calgary
      cy.get('select[name="ProvinceList"]').select('Alberta')
      cy.get('select[name="CitiesList"]').select('Calgary')
      cy.get('[for="OfficeList"]').should('contain.text', 'Calgary')
      cy.get('input[name="OfficeList"]').should('not.be.enabled')
      cy.get('#4802').click()
      cy.get('input[name="OfficeList"]').should('be.enabled')
      cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})


    it('should find British Columbia and the cities in the dropdown', () => {  
      // British Columbia - Vancouver
      cy.get('select[name="ProvinceList"]').select('British Columbia').should('have.value', 'British Columbia')
      cy.get('select[name="CitiesList"]').select('Vancouver')
      cy.get('[for="OfficeList"]').should('contain.text', 'Vancouver')
      cy.get('input[name="OfficeList"]').should('not.be.enabled')
      cy.get('#5823').click()
      cy.get('input[name="OfficeList"]').should('be.enabled')
      cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})

it('should find Manitoba and the cities in the dropdown', () => {  
  // Manitoba - Winnipeg
 cy.get('select[name="ProvinceList"]').select('Manitoba').should('have.value', 'Manitoba')
 cy.get('select[name="CitiesList"]').select('Winnipeg')
 cy.get('[for="OfficeList"]').should('contain.text', 'Winnipeg')
 cy.get('input[name="OfficeList"]').should('not.be.enabled')
 cy.get('#4123').click()
 cy.get('input[name="OfficeList"]').should('be.enabled')
 cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})

it('should find Ontario and the cities in the dropdown', () => {  
  cy.injectAxe()
  // Ontario - Ottawa - others
 cy.get('select[name="ProvinceList"]').select('Ontario').should('have.value', 'Ontario')
 cy.get('select[name="CitiesList"]').select('Ottawa')
 cy.get('[for="OfficeList"]').should('contain.text', 'Ottawa')
 cy.get('input[name="OfficeList"]').should('not.be.enabled')
 cy.get('#3747').click()
 cy.get('input[name="OfficeList"]').should('be.enabled')
 cy.get('a > :nth-child(2)').should('contain.text', ' ServiceCanada.gc.ca')
 cy.get('input[type="radio"]').next().should('not.be.enabled')
 cy.get('#3745').click()
 cy.get('input[name="OfficeList"]').should('be.enabled')
 checkA11y(cy)
})

});