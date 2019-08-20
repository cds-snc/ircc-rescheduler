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
    })

    it('Has no detectable a11y violations on load', () => {
      // Test the page at initial load
      cy.injectAxe()
      checkA11y(cy)
    })
  
    it('should do something', () => {  
     cy.url().should('contain', '/selectProvince')

    })

});