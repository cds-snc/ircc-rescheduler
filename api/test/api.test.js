const request = require('supertest')
const Server = require('../src/server').default

const reqId = 'ad6b987e-4722-11e8-8771-5546b650d95e'
const msgId = '01000162f3ba365d-b87e3e31-b93c-47bb-97ba-631c33ae7267-000000'
let mockSES = {
  sendMail: jest.fn(() => {
    return Promise.resolve({
      response: reqId,
      messageId: msgId,
    })
  }),
}

describe('Mutations', () => {
  describe('decline', () => {
    describe('when an error occurs while sending', () => {
      it('returns a properly formatted GraphQL errors array', async () => {
        let errorMock = {
          sendMail: jest.fn(() => {
            return Promise.reject(new Error('so unhappy right now'))
          }),
        }
        let app = Server({
          mailer: errorMock,
          receivingAddress: 'test@example.com',
          sendingAddress: 'test@example.com',
          siteUrl: ' ',
        })

        let response = await request(app)
          .post('/graphql')
          .set('Content-Type', 'application/graphql; charset=utf-8').send(`
            mutation {
              decline(input: {
                fullName: "asdf"
                explanation: "asdf"
                email: "test@test.com"
                paperFileNumber: "111"
                reason: "because reasons"
                availability: ["2018-06-26","2018-06-29","2018-07-31"]
              }){
                messageId
							}
            }
        `)
        let {
          errors: [err],
        } = response.body
        expect(err.message).toEqual('so unhappy right now')
      })
    })

    describe('when no errors occur sending an email', () => {
      it('returns a message id when asked', async () => {
        let app = Server({
          mailer: mockSES,
          receivingAddress: 'test@example.com',
          sendingAddress: 'test@example.com',
          siteUrl: ' ',
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
                email:"test@test.com"
                availability: ["2018-06-26","2018-06-29","2018-07-31"]
              }){
                messageId
							}
            }
        `)
        let { decline } = response.body.data
        expect(decline[0].messageId).toEqual(msgId)
      })

      it(`rejects requests that don't include 3 dates`, async () => {
        let app = Server({
          mailer: mockSES,
          receivingAddress: 'test@example.com',
          sendingAddress: 'test@example.com',
          siteUrl: ' ',
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
                email:"test@test.com"
                availability: ["2018-06-29","2018-07-31"]
              }){
                messageId
							}
            }
        `)
        let {
          errors: [err],
        } = response.body
        expect(err.message).toMatch(/Three dates/)
      })
    })

    it('returns a request id when asked', async () => {
      let app = Server({
        mailer: mockSES,
        receivingAddress: 'test@example.com',
        sendingAddress: 'test@example.com',
        siteUrl: ' ',
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
                email:"test@test.com"
                availability: ["2018-06-26","2018-06-29","2018-07-31"]
              }){
                requestId
							}
            }
        `)
      let { decline } = response.body.data

      expect(decline[0].requestId).toEqual(reqId)
    })
  })
})
