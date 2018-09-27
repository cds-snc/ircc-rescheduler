/* When toggling the language the intro text Month name should be in the correct language. */
import { getStartMonthName } from '../../../src/utils/calendarDates'
import { getGlobalLocation } from '../../../src/locations'
import { register } from './full-run'

context('Calendar intro text', () => {
  it('should show intro text in the correct language', () => {
    cy.visit('/calendar')
    cy.url().should('contain', '/calendar')

    /*
      `getStartMonthName` eventually calls `firstValidDay`,
      which will fail if there's no location object already set.

      When running the app normally, location is set based on the subdomain.
      All `getStartMonthName` calls within the app are fine.

      Given that `getStartMonthName` is being called outside of the app context,
      we have to manually pass in a location object, which we can do by
      manually passing one into `getGlobalLocation`.
    */
    getGlobalLocation(require('../../../src/locations/vancouver'))
    const monthEn = getStartMonthName(new Date(), 'en')
    const monthFr = getStartMonthName(new Date(), 'fr')

    cy.get('#calendar-intro').should('contain', `in ${monthEn}`)
    cy.get('#language-toggle').click({ force: true })
    cy.get('#calendar-intro').should('contain', `en ${monthFr}`)
  })
})

context('Calendar page h1', () => {
  const fixture = 'user'

  beforeEach(() => {
    cy.visit('/register')
    cy.url().should('contain', '/register')
  })

  it('should refer to only the single user if no family members were selected', () => {
    const withFamilyOption = false

    register(cy, fixture, withFamilyOption)

    cy.get('#register-form').submit({ force: true })
    cy.url().should('contain', '/calendar')

    cy.get('h1#calendar-header').should(
      'contain',
      'Select 3 days you’re available',
    )
  })

  it('should refer to the user’s family if family members were selected', () => {
    const withFamilyOption = true

    register(cy, fixture, withFamilyOption)

    cy.get('#register-form').submit({ force: true })
    cy.url().should('contain', '/calendar')

    cy.get('h1#calendar-header').should(
      'contain',
      'Select 3 days you and your family are available',
    )
  })
})
