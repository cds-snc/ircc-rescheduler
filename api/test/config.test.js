const request = require('supertest')
const Server = require('../src/server').default

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

describe('config', () => {
  let app
  let fauxMailer = jest.fn(() => fakeSGmail)

  beforeEach(async () => {
    app = Server({
      mailer: fauxMailer,
      receivingAddress: 'test@sink.sendgrid.net',
    })
  })

  it('is properly mounted at /graphql', async () => {
    let response = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/graphql; charset=utf-8').send(`
        query {
          __schema {
              types {
                      name
                    }
              }
        }
    `)
    expect(response.status).toEqual(200)
  })
})
