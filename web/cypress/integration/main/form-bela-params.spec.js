import { fullRun } from './full-run'

context('Full Run-through with Bela params', () => {
  beforeEach(() => {
    cy.visit('/?utm_source=BELA%20email&utm_medium=email')
  })

  it('should be able to fill in a profile and reach the confirmation page', () => {
    fullRun(cy)
  })
})
