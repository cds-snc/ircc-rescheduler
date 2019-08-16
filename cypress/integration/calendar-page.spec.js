
// Verify Items and functions on the calendar page. 
describe('Calendar page functions', () => {
    beforeEach(() => {
      cy.visit('/calendar')
    })
  
    it('should do something', () => {  
     cy.url().should('contain', '/calendar')

    })

});