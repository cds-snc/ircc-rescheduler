/* eslint-disable no-undef */
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
      checkA11y(cy)
    })
  
    it('should do something', () => {  
     cy.url().should('contain', '/calendar')
     cy.get('#calendar-header').should('contain.text', 'Select a day you’re available between')
    })

});