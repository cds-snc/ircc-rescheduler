import { fullRun } from './full-run-fr'

context('Full Run-through', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to fill in a profile and reach the confirmation page', () => {
    fullRun(cy)
  })
})
