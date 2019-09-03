/* eslint-disable no-undef */
// Verify Items and functions on the calendar page. 

function checkA11y(cy){ 
  cy.checkA11y({
    runonly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"]}});
}

describe('500 page functions', () => {
  beforeEach(() => {
    cy.visit('/not-found')
  })

it('Has no detectable a11y violations on load', () => {
  // Test the page at initial load
  cy.injectAxe()
  checkA11y(cy)
})

  it('should have privacy and toc on 404 page', () => {
    cy.visit('/not-found')
    cy.get('#footer div a')
      .eq(0)
      .should('contain', 'Privacy')
    cy.get('#footer a')
      .eq(1)
      .should('contain', 'Terms and Conditions')
  })


})
