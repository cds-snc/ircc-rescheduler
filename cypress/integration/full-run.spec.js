/* eslint-disable no-undef */
import { nextButton, enterButton, headerImg, langLink, privacyLink, tocLink, aboutCA, sMedia, mobileApp, aboutCAHref, sMediaHref, mobileHref, tocHref, privacyHref, footerImg } from './utils'

// Verify Items and functions on the full run page
function checkA11y(cy) {
  cy.checkA11y({
    runonly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa"]
    }
  });
}

describe('should perform functions on the review page', () => {
  beforeEach(() => {
    cy.visit('/')
  })


  it.only('Should pass the data from register, location and calendar to the review page', () => {
    cy.injectAxe()


    // check the accept privacy notice box
    cy.get('#policyCheck').click()
    //click to move to the register page
    cy.get('#start-request').click({ force: true })
    cy.url().should('contain', '/register')
    checkA11y(cy)
    //enter in values on register page
    cy.fixture('user').then(data => {
      cy.get('#paperFileNumber').type(data.bilNumber, { force: true })
      cy.get('#email').type(data.email, { force: true })
      cy.get('#emailConfirm').type(data.email, { force: true })
      cy.get(nextButton).click()
      cy.url().should('contain', '/selectProvince')
      cy.wait(2000)
      
    })
    // select a location
    cy.get('#ProvinceList').should('contains.text', 'Select a Province')
    cy.get('select[name="ProvinceList"]').select('Alberta').should('have.value', 'Alberta')
    cy.wait(2000)
    cy.get('#CitiesList').should('contain.text', 'Select a city')
    cy.wait(2000)
    cy.get('select[name="CitiesList"]').select('Edmonton').should('have.value', 'Edmonton')
    // cy.get('input[type="radio"]').click()
    cy.get('#4601').click()
    // need to gather what the location is for 4601
    cy.get(nextButton).click()
    checkA11y(cy)

    //select appointment date and time
    // make sure we are on the right page
    cy.url().should('contains', '/calendar')
    // Compare today's date with the Day--today
    const todaysDate = Cypress.moment().format('DD')
    // next day
    const tomorrowDate = Cypress.moment().add(1, 'days').format('DD')
    cy.log('todays date ' + todaysDate)
    cy.log('tomorrow ' + tomorrowDate)

    // trying to find all of the available days as they are not disabled
    cy.get('.DayPicker-Day').its('.aria-disabled="false"').then(($firstAvailDayButton) => {
      const firstAvailDayNum = $firstAvailDayButton.text().trim()
      // firstAvailDayNum shows all of the number in the month
      // click the first available day
      cy.log('availableDayNum ' + firstAvailDayNum)
      $firstAvailDayButton.click();
      cy.log($firstAvailDayButton)
      // day button shows [object Object]
      cy.log('day button ' + $firstAvailDayButton)
    })
    // selected day should be visible
    cy.get('.DayPicker-Day--selected').should('be.visible')
    // get the date string that is shown in the selected day box as 'dateString'
    // this should get the dateString that will be shown in the review page
    cy.get('ul > li .day-box').then(($dateSelected) => {
      // get the calendar day value of the selected day .DayPicker-Day--selected
      const dateString = $dateSelected.text()
      cy.log('date selected = ' + dateString)
      // compare the --selected day to the day shown in the #selectedDaysBox
      cy.get('time').should('contain', dateString)
      // cy.get('time').invoke('text').as('dateString')
      // cy.fixture('time').as('dateStringAlias')

      // })

      // get the date from the selected day
      cy.get('.DayPicker-Day--selected').as('selectedDay')
      // Find the day that is selected in the calendar

      cy.get('@selectedDay').then(($available) => {
        // get the value of the selected day .DayPicker-Day--selected
        const dayString = $available.text()
        cy.log('dayString = ' + dayString)
        // compare the --selected day to the day shown in the #selectedDaysBox
        cy.get('time').should('contain', dayString)
      })
      // review strings in the #selectedDaysBox
      cy.get('#selectedDaysBox').should('contain.text', 'Please select your time slot:')

      // find the time in the dropdown list
      // find the first selection object from the list of Time Slot selection objects 
      cy.get('select[name="TimeSlot"] > option:eq(1)').as('firstObject')
      // get that object to get the time string from it
      cy.get('@firstObject').then(($firstTime) => {
        // get the time string from the selected object
        const timeString = $firstTime.text()
        cy.log('timeString = ' + timeString)
        // select that time slot from the list using the string you found
        cy.get('select[name="TimeSlot"]').select(timeString)
      })
      cy.get(nextButton).should('be.enabled').and('be.visible')
      cy.get(nextButton).click()
      cy.url().should('contains', '/review')

      // Verify if all of the entered data appears on the review page. 
      cy.fixture('user').then(data => {
        cy.get('#bilNumber-body').should('contain', data.bilNumber)
        cy.get('#email-address-body').should('contain', data.email)
      })


      cy.get('#a11y-body').should('contain', 'No')
      cy.get('#location-body').should('contain', 'Edmonton')


      cy.get('#date-body').should('contain', dateString)


      //    cy.get(nextButton).click()
      //    cy.url().should('contains', '/confirmation')


      //verify the values appear on the review page





    })

  })
})