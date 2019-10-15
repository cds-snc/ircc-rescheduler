/* eslint-disable no-undef */
import {
  nextButton,
  headerImg,
  langLink,
  privacyLink,
  tocLink,
  aboutCA,
  sMedia,
  mobileApp,
  aboutCAHref,
  sMediaHref,
  mobileHref,
  tocHref,
  privacyHref,
  footerImg,
} from './utils'

// Verify Items and functions on the calendar page.

function checkA11y(cy) {
  cy.checkA11y({
    runonly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  })
}

describe.skip('Calendar page functions', () => {
  beforeEach(() => {
    cy.visit('/calendar')
  })

  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    cy.injectAxe()
    cy.url().should('contains', '/calendar')
    checkA11y(cy)
  })

  it('should go to the landing page and show header image and links ', () => {
    cy.get(headerImg).should('be.visible')
    cy.get(langLink).should('be.visible', 'Français')
    cy.get('[role="banner"] > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'Step 3 of 4 – Select a day and time')
  })
  it('should check footer info for links and canada image', () => {
    cy.get(aboutCA)
      .should('be.visible')
      .and('contain', 'About Canada.ca')
    cy.get(sMedia)
      .should('be.visible')
      .and('contain', 'Social media')
    cy.get(mobileApp)
      .should('be.visible')
      .and('contain', 'Mobile applications')
    cy.get(tocLink).should('contain', 'Terms and Conditions')
    cy.get(privacyLink).should('contain', 'Privacy')

    cy.get(aboutCAHref).should(
      'have.attr',
      'href',
      'https://www.canada.ca/en/government/about.html',
    )
    cy.get(sMediaHref).should(
      'have.attr',
      'href',
      'https://www.canada.ca/en/social.html',
    )
    cy.get(mobileHref).should(
      'have.attr',
      'href',
      'https://www.canada.ca/en/mobile.html',
    )
    cy.get(tocHref).should(
      'have.attr',
      'href',
      'https://digital.canada.ca/legal/terms/',
    )
    cy.get(privacyHref).should('have.attr', 'href', '/privacy')

    cy.get(footerImg).should('be.visible')
  })

  // This needs to be updated for the text TBD
  it('should contain some text', () => {
    cy.get('#calendar-header').should('contains.text', 'Select a day')
    // TODO: check for the rest of the text here
  })

  it('should find the first selectable day', () => {
    // make sure we are on the right page
    cy.url().should('contains', '/calendar')
    // Compare today's date with the Day--today
    const todaysDate = Cypress.moment().format('DD')
    // next day
    const tomorrowDate = Cypress.moment()
      .add(1, 'days')
      .format('DD')
    cy.log('todays date ' + todaysDate)
    cy.log('tomorrow ' + tomorrowDate)
    // class DayPicker-Day contains today's date - not acutally useful at this point
    // cy.get('.DayPicker-Day').should('contain', todaysDate)

    // trying to find all of the available days as they are not disabled
    cy.get('.DayPicker-Day')
      .its('.aria-disabled="false"')
      .then($firstAvailDayButton => {
        const firstAvailDayNum = $firstAvailDayButton.text().trim()
        // firstAvailDayNum shows all of the number in the month
        // click the first available day
        cy.log('availableDayNum ' + firstAvailDayNum)
        $firstAvailDayButton.click()
        cy.log($firstAvailDayButton)
        // day button shows [object Object]
        cy.log('day button ' + $firstAvailDayButton)
      })
    // could possibly check to see that today is not selectable
    //  cy.get('.DayPicker-Day--today').click()

    // selected day should be visible
    cy.get('.DayPicker-Day--selected').should('be.visible')

    // Find the day that is selected in the calendar and compare with day for timeslots
    cy.get('.DayPicker-Day--selected').as('selectedDay')
    cy.get('@selectedDay').then($available => {
      // get the value of the selected day .DayPicker-Day--selected
      const dayString = $available.text()
      cy.log('dayString = ' + dayString)
      // compare the --selected day to the day shown in the #selectedDaysBox
      cy.get('time').should('contain', dayString)
    })
    // review strings in the #selectedDaysBox
    cy.get('#selectedDaysBox').should(
      'contain.text',
      'Please select your time slot:',
    )
    // get the date string that is shown in the selected day box as 'dateString'
    cy.get('ul > li .day-box').then($dateSelected => {
      // get the value of the selected day .DayPicker-Day--selected
      const dateString = $dateSelected.text()
      cy.log('date selected = ' + dateString)
      // compare the --selected day to the day shown in the #selectedDaysBox
      cy.get('time').should('contain', dateString)
    })

    // find the time in the dropdown list
    // find the first selection object from the list of Time Slot selection objects
    cy.get('select[name="TimeSlot"] > option:eq(1)').as('firstObject')
    // get that object to get the time string from it
    cy.get('@firstObject').then($firstTime => {
      // get the time string from the selected object
      const timeString = $firstTime.text()
      cy.log('timeString = ' + timeString)
      // select that time slot from the list using the string you found
      cy.get('select[name="TimeSlot"]').select(timeString)
    })
    cy.get(nextButton)
      .should('be.enabled')
      .and('be.visible')
    // cy.get(nextButton).click()
    // cy.url().should('contains', '/review')
  })

  it.skip('should count the number of days available for appointments (30)', () => {
    cy.url().should('contains', '/calendar')
    // this finds the remaining days in the currently selected month that are selectable
    // more work to be done here
    cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
      const count = el.length
      expect(count).eq(22)
    })
  })

  // this one is done in anothe test. the selected day is not today
  it.skip('should select a time an click enter button', () => {
    cy.url().should('contains', '/calendar')
    // compare today's actual date with the Day--today
    const todaysDate = Cypress.moment().format('LL') //('dddd,MMMMDD,YYYY')
    cy.get('.DayPicker-Day--today').click()
    //   cy.get('.DayPicker-Day--selected').should('be.visible')
    cy.get('time').should('contain', todaysDate)
    // cy.get('[type="checkbox"]').check(['#checkbox_1'])
    cy.get(nextButton).click()
    cy.url().should('contains', '/review')
  })
  // aria-label="Next Month"
  it.skip('should click to show the next month unless the last day is the end of the month', () => {
    cy.url().should('contains', '/calendar')
    const thisMonth = Cypress.moment().format('MMMM')
    cy.get('#renderMonthName').should('contain', thisMonth)
    // const thisDay = Cypress.moment().format('DD')
    cy.get('.DayPicker-Body > :nth-child(1) > [tabindex="0"]').should(
      'contain',
      '1',
    )
    // make sure the available days span into the next month

    // if (count <= 30) {

    // cy.get('.DayPicker-NavButton--next').click({ force: true })
    //   }
    cy.get('.DayPicker-Body > :nth-child(1) > [tabindex="0"]').then(el => {
      const count = el.length
      expect(count + 30).eq(31)
      cy.get('.DayPicker-Day').should('contain', '31')
      cy.get('[aria-label="Monday, September 30, 2019"]')
      // make sure we're on a month that has 3 selectable days
      // if (count < 3) {
      //  cy.get('.DayPicker-NavButton--next').click({ force: true })
    })

    // cy.get('.DayPicker-NavButton--next').click()
    // const nextMonth = Cypress.moment().add(1, 'month').format('MMMM')
    // cy.get('#renderMonthName').should('contain', nextMonth)
    //   cy.get('.DayPicker-Day[aria-disabled=false]').then(el => {
    //     const count = el.length
    //     expect(count).eq(30)
    //  })
  })

  it('should select the next month if 30 days extends', () => {
    // find start date of the 30 days.
    const startMonth = Cypress.moment().format('MM')
    cy.log('Start Month = ' + startMonth)
    // cy.get('.DayPicker-Day--today').as(startDate)
    // figure out 30 days in future
    const endMonth = Cypress.moment()
      .add(30, 'days')
      .format('MM')
    cy.log('End Month = ' + endMonth)
    const monthName = Cypress.moment()
      .add(30, 'days')
      .format('MMMM')
    cy.log('Month Name= ' + monthName)
    cy.get('.DayPicker-Day--today').then($el => {
      // if the 30 days is within one month no need to click
      if (startMonth === endMonth) {
        cy.get('#renderMonthName > div').should('contain', monthName)
      }
      // click two times if the start is the end of january
      else {
        if (startMonth === 1 && endMonth === 3) {
          cy.get('.DayPicker-NavButton--next').click({ force: true })
          cy.get('.DayPicker-NavButton--next').click({ force: true })
          cy.get('#renderMonthName > div').should('contain', monthName)
        } else {
          cy.get('.DayPicker-NavButton--next').click({ force: true })
          cy.get('#renderMonthName > div').should('contain', monthName)
        }
      }
    })
  })
})
