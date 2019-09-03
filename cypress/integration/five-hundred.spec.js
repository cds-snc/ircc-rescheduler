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
    cy.visit('/500')
  })

it('Has no detectable a11y violations on load', () => {
  // Test the page at initial load
  cy.injectAxe()
  checkA11y(cy)
})

  it('can load 500 page', () => {
    cy.visit('/500')

    cy.get('h1')
      .eq(0)
      .should('contain', 'Something went wrong.')

    cy.get('#footer div a')
      .eq(0)
      .should('contain', 'Privacy')
    cy.get('#footer a')
      .eq(1)
      .should('contain', 'Terms and Conditions')
  })
})
