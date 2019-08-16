// Verify Items and functions on the register page - BIL # - email and radio button. 
describe('Register page functions', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
    it('should have header and footer canada svg', () => {
        cy.get('.svg-container').eq(1).should('be.visible')
        cy.get('.css-1e5qbzj-baseSVG-engSVG').should('be.visible')
        cy.url().should('contain', '/register')
      })
   

})