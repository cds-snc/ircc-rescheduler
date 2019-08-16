/* eslint-disable no-undef */
// Verify Items and functions on the calendar page. 
describe('Calendar page functions', () => {
    beforeEach(() => {
      cy.visit('/calendar')
    })
  
    it('should do something', () => {  
     cy.url().should('contain', '/calendar')
     cy.get('#calendar-header').should('contain.text', 'Select a day you’re available between')
    })

});