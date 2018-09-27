context('I cannot attend ...', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should should navigate to explain page', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')
    cy.get('#availability').click({ force: true })
    // submit the form with not enough dates selected
    cy.get('#selectedDays-form').submit({ force: true })
    cy.url().should('contain', '/explanation')
  })

  it('should hide the selected days box', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')
    // select a days
    cy.get('.DayPicker-Day[aria-disabled=false]')
      .eq(0)
      .click({ force: true })

    cy.get('#availability').click({ force: true })
    expect(cy.get('#selectedDaysBox').should('be.hidden'))
  })
})
