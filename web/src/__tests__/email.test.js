import { sendMail } from '../email/sendmail'
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

describe('Email', () => {
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
