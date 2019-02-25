import { fullRun } from './full-run'

context('Full Run-through FR', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it.skip('should be able to fill in a profile and reach the confirmation page', () => {
    fullRun(cy, 'fr', false)
  })
})
