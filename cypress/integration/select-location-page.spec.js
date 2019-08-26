/* eslint-disable no-undef */
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
  
    it('should go to the selectProvince page', () => {  
     cy.url().should('contains', '/selectProvince')

    })

    it('should click into the province selection dropdown and show Select a City dropdown', () => {  
      cy.injectAxe()
      cy.get('#ProvinceList').should('contains.text', 'Select a Province')
       checkA11y(cy)
      cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
      cy.get('select[name="CitiesList"]').select('null').should('have.value', 'null')
      cy.get('#CitiesList').should('contain.text', 'Select a City')
      cy.get('select[name="CitiesList"]').select('Edmonton').should('have.value', 'Edmonton')

     })

     it('should click into the Select a City dropdown and show city and locations and button ', () => {  
      cy.injectAxe()
      cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
      cy.get('select[name="CitiesList"]').select('Edmonton').should('have.value', 'Edmonton')
     
      cy.get('[for="Locations"]').should('contains.text', 'Locations in:')
      cy.get('[for="Locations"]').should('contain.text', 'Edmonton')
      cy.get('.css-arysfy-govuk_button-button-mediaQuery-button').should('be.visible')
      cy.get('input[name="selectcity"]').should('not.be.enabled')
      cy.get('#4754').click()
      cy.get('input[name="selectcity"]').should('be.enabled')
      cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
       checkA11y(cy)
 
     })
     
     it('should find Alberta and the cities in the dropdown', () => {  
       // Alberta - Edomonton - checked in previous test - Calgary
      cy.get('select[name="ProvinceList"]').select('Alberta')
      cy.get('select[name="CitiesList"]').select('Calgary')
      cy.get('[for="Locations"]').should('contain.text', 'Calgary')
      cy.get('input[name="selectcity"]').should('not.be.enabled')
      cy.get('#4802').click()
      cy.get('input[name="selectcity"]').should('be.enabled')
      cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})


it('should find British Columbia and the cities in the dropdown', () => {  
  // British Columbia - Vancouver
 cy.get('select[name="ProvinceList"]').select('British Columbia').should('have.value', 'British Columbia')
 cy.get('select[name="CitiesList"]').select('Vancouver')
 cy.get('[for="Locations"]').should('contain.text', 'Vancouver')
 cy.get('input[name="selectcity"]').should('not.be.enabled')
 cy.get('#5823').click()
 cy.get('input[name="selectcity"]').should('be.enabled')
 cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})

it('should find Manitoba and the cities in the dropdown', () => {  
  // Manitoba - Winnipeg
 cy.get('select[name="ProvinceList"]').select('Manitoba').should('have.value', 'Manitoba')
 cy.get('select[name="CitiesList"]').select('Winnipeg')
 cy.get('[for="Locations"]').should('contain.text', 'Winnipeg')
 cy.get('input[name="selectcity"]').should('not.be.enabled')
 cy.get('#4123').click()
 cy.get('input[name="selectcity"]').should('be.enabled')
 cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})

it.only('should find Ontario and the cities in the dropdown', () => {  
  // Manitoba - Winnipeg
 cy.get('select[name="ProvinceList"]').select('Ontario').should('have.value', 'Ontario')
 cy.get('select[name="CitiesList"]').select('Ottawa')
 cy.get('[for="Locations"]').should('contain.text', 'Ottawa')
 cy.get('input[name="selectcity"]').should('not.be.enabled')
 cy.get('#3747').click()
 cy.get('input[name="selectcity"]').should('be.enabled')
 cy.get('a > :nth-child(2)').should('have.text', ' ServiceCanada.gc.ca')
})

});