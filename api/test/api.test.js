const request = require('supertest')
const Server = require('../src/server').default

const reqId = 'ad6b987e-4722-11e8-8771-5546b650d95e'
const msgId = '01000162f3ba365d-b87e3e31-b93c-47bb-97ba-631c33ae7267-000000'
let mockSES = {
  sendEmail: jest.fn(() => {
    return {
      promise: () => {
        return Promise.resolve({
          ResponseMetadata: {
            RequestId: reqId,
          },
          MessageId: msgId,
        })
      },
    }
  }),
}

describe('Mutations', () => {
  describe('decline', () => {
    describe('when an error occurs while sending', () => {
      it('returns a properly formatted GraphQL errors array', async () => {
        let errorMock = {
          sendEmail: jest.fn(() => {
            return {
              promise: () => {
                return Promise.reject(new Error('so unhappy right now'))
              },
            }
          }),
        }
        let app = Server({
          mailer: errorMock,
          receivingAddress: 'test@example.com',
          sendingAddress: 'test@example.com',
        })

        let response = await request(app)
          .post('/graphql')
          .set('Content-Type', 'application/graphql; charset=utf-8').send(`
            mutation {
              decline(input: {
                fullName: "asdf"
                explanation: "asdf"
                paperFileNumber: "111"
                reason: "because reasons"
              }){
                messageId
							}
            }
        `)
        let { errors: [err] } = response.body
        expect(err.message).toEqual('so unhappy right now')
      })
    })
    describe('when no errors occur sending an email', () => {
      it('returns a message id when asked', async () => {
        let app = Server({
          mailer: mockSES,
          receivingAddress: 'test@example.com',
          sendingAddress: 'test@example.com',
        })

        let response = await request(app)
          .post('/graphql')
          .set('Content-Type', 'application/graphql; charset=utf-8').send(`
            mutation {
              decline(input: {
                fullName: "asdf"
                explanation: "asdf"
                paperFileNumber: "111"
                reason: "because reasons"
              }){
                messageId
							}
            }
        `)
        let { decline } = response.body.data
        expect(decline.messageId).toEqual(msgId)
      })
    })
    it('returns a request id when asked', async () => {
      let app = Server({
        mailer: mockSES,
        receivingAddress: 'test@example.com',
        sendingAddress: 'test@example.com',
      })

      let response = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/graphql; charset=utf-8').send(`
            mutation {
              decline(input: {
                fullName: "asdf"
                explanation: "asdf"
                paperFileNumber: "111"
                reason: "because reasons"
              }){
                requestId
							}
            }
        `)
      let { decline } = response.body.data
      expect(decline.requestId).toEqual(reqId)
    })
  })
})
