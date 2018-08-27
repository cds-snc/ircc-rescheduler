context(
  'Full Run-through using only query parameters including validation errors',
  () => {
    // hardcoding the days since we're not validating on correct dates
    let selectedDays = {
      '2018-01-01': 'Monday, January 1, 2018',
      '2018-01-02': 'Tuesday, January 2, 2018',
      '2018-01-03': 'Wednesday, January 3, 2018',
    }

    it('should be able to trigger validation errors, recover, and reach the confirmation page with all of the submitted data', () => {
      cy.visit('/')
      cy.get('main a').should('have.text', 'Start now')
      cy.get('main a').click({ force: true })
      cy.url().should('contain', '/register')

      cy.fixture('user').then(data => {
        // no query parameter value set for email or paper file number
        cy.visit(
          `/register?fullName=${data.fullName}&email=&paperFileNumber=&reason=${
            data.reason
          }&explanation=${data.explanation}`,
        )
      })

      cy.get('#submit-error h2').should(
        'contain',
        'Some information is missing.',
      )
      cy.get('#submit-error ul li:first-of-type').should(
        'contain',
        'Email address',
      )
      cy.get('#submit-error ul li:last-of-type').should(
        'contain',
        'Paper file number',
      )

      cy.fixture('user').then(data => {
        cy.visit(
          `/register?fullName=${data.fullName}&email=${
            data.email
          }&paperFileNumber=${data.paperFileNumber}&reason=${
            data.reason
          }&explanation=${data.explanation}`,
        )
      })

      cy.url().should('contain', '/calendar')

      const queryParamReducer = (accumulator, currentValue) =>
        `${accumulator}selectedDays=${currentValue}&`

      const calendarQueryString = Object.keys(selectedDays).reduce(
        queryParamReducer,
        '/calendar?',
      )
      // the calendar will accept any 3 days, as long as they are formatted correctly
      cy.visit(calendarQueryString)

      cy.url().should('contain', '/review')

      cy.fixture('user').then(data => {
        cy.get('main').should('contain', data.fullName)
        cy.get('main').should('contain', data.email)
        cy.get('main').should('contain', data.paperFileNumber)
        cy.get('main').should('contain', data.explanation)
        Object.values(selectedDays).map(val =>
          cy.get('main').should('contain', val),
        )
      })

      cy.get('#review-form').submit({ force: true })

      // should hit the confirm page now
      cy.url().should('contain', '/confirmation')
    })
  },
)
