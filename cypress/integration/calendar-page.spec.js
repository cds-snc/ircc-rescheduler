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
     cy.url().should('contains', '/calendar')
     cy.get('#calendar-header').should('contains.text', 'Select a day you’re available between')
    })

    it.only('should find selectable days', () => {  
      cy.url().should('contains', '/calendar')
      cy.get('#calendar-header').should('contains.text', 'Select a day you’re available between')

      // trying to compare today's actual date with the Day--today
       const todaysDate = Cypress.moment().format('LL')//('dddd,MMMMDD,YYYY')
      // cy.get('.DayPicker-Day--today').should(($date) => {
      // expect($date.eq(0)).to.contain(todaysDate)
      // })
      cy.get('.DayPicker-Day--today').click()
      cy.get('.DayPicker-Day--selected').should('be.visible')
      cy.get('.css-ex3iit-daySelection-mediaQuery-daySelection').should('contain.text', 'Please select your time slot:')
      cy.get('time').should('contain', todaysDate)


    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length
      expect(count).eq(16)
      // make sure we're on a month that has 3 selectable days
     // if (count <= 30) {

       // cy.get('.DayPicker-NavButton--next').click({ force: true })
   //   }
    })
  })

});