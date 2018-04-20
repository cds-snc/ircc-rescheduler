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

describe('Cross Origin Resource Sharing', () => {
  it('has Cross Origin Resource Sharing enabled for all domains', async () => {
    let app = Server({
      mailer: fakeSGmail,
      receivingAddress: 'test@sink.sendgrid.net',
    })

    let response = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send({
        query: `{
        __schema {
          queryType {
            fields {
              name
            }
          }
        }
      }`,
      })

    let { headers } = response
    expect(headers['access-control-allow-origin']).toEqual('*')
  })
})
