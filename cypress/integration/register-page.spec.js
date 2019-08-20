/* eslint-disable no-undef */
// Verify Items and functions on the register page - BIL # - email and radio button.
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
    
    it('should have header and footer canada svg', () => {
        cy.get('.svg-container').eq(1).should('be.visible')
        cy.get('.css-1e5qbzj-baseSVG-engSVG').should('be.visible')
        cy.url().should('contain', '/register')
      })
   

});