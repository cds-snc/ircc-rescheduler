
// Verify Items and functions on the select location, and office page. 
describe('select provice, city and office page functions', () => {
    beforeEach(() => {
      cy.visit('/selectProvice')
    })
  
    it('should do something', () => {  
     cy.url().should('contain', '/selectProvice')

    })

});