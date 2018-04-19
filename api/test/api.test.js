const request = require('supertest')
const Server = require('../src/server').default

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let fakeSGmail = {
  send: jest.fn(() => {
    return Promise.resolve([
      {
        statusCode: 202,
        headers: { 'x-message-id': 'aaaaaaaaaaaaaaaaaa' },
      },
      undefined,
    ])
  }),
}

describe('Mutations', () => {
  describe('decline', () => {
    it('notifies IRCC that the person associated with the given UCI will not be attending their ceremony', async () => {
      let app = Server({
        mailer: fakeSGmail,
        receivingAddress: 'test@sink.sendgrid.net',
      })

      let response = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/graphql; charset=utf-8').send(`
            mutation {
              decline(
                uci: "111"
                reason: "because reasons"
              ){
							 statusCode
							}
            }
        `)
      let { data: { decline: { statusCode } } } = response.body
      expect(statusCode).toEqual(202)
    })
  })
})
