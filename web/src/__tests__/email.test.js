import { sendMail, cleanDates } from '../email/sendmail'
import { humanReadable, datesMarkup } from '../email/email-template'
const reqId = 'ad6b987e-4722-11e8-8771-5546b650d95e'
const msgId = '01000162f3ba365d-b87e3e31-b93c-47bb-97ba-631c33ae7267-000000'

let mockSES = {
  sendMail: (params, cb) => {
    if (!params.receivingAddress) {
      cb(new Error('Invalid receivingAddress'))
    }

    cb(null, {
      response: reqId,
      messageId: msgId,
    })
  },
}

const handleMailError = jest.fn(e => {
  return {
    messageId: null,
    errorMessage: e.message,
  }
})

const options = {
  htmlTemplate: '<div>Mail Test</div>',
  plainTemplate: 'Mail Test',
  formValues: {},
  url: ' ',
  receivingAddress: 'mock-sendmail@cds-snc.ca',
  sendingAddress: 'receive-mock-sendmail@cds-snc.ca',
}

describe('Send Email', () => {
  it('it handles response', async () => {
    const response = await sendMail(mockSES, options).catch(handleMailError)
    expect(response.messageId).toEqual(msgId)
  })

  it('it handles bad invalid options', async () => {
    const badOptions = { ...options, receivingAddress: null }
    const response = await sendMail(mockSES, badOptions).catch(handleMailError)
    expect(response.errorMessage).toEqual('Invalid receivingAddress')
    expect(handleMailError.mock.calls.length).toBe(1)
  })
})

describe('Handles Input Data for Email', () => {
  it('it handles selected days', async () => {
    const selectedDays = '2018-08-23,2018-08-30,2018-09-06'
    let cleaned = cleanDates(selectedDays)
    const dates = humanReadable(cleaned)
    const formatted = datesMarkup(dates, '').trim()
    expect(formatted).toEqual(
      'Thursday August 23 2018 Thursday August 30 2018 Thursday September 06 2018',
    )
  })

  it('it handles selected days locale', async () => {
    const selectedDays = '2018-08-23,2018-08-30,2018-09-06'
    let cleaned = cleanDates(selectedDays)
    const dates = humanReadable(cleaned, 'fr')
    const formatted = datesMarkup(dates, '').trim()
    expect(formatted).toEqual(
      'jeudi août 23 2018 jeudi août 30 2018 jeudi septembre 06 2018',
    )
  })

  it('Handles selected days with whitespace', async () => {
    const selectedDays = '2018-08-23 ,2018-08-30, 2018-09-06 '
    let cleaned = cleanDates(selectedDays)
    const dates = humanReadable(cleaned, 'en')
    const formatted = datesMarkup(dates, '').trim()
    expect(formatted).toEqual(
      'Thursday August 23 2018 Thursday August 30 2018 Thursday September 06 2018',
    )
  })
})
