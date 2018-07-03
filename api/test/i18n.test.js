const request = require('supertest')
const i18next = require('i18next')
const Server = require('../src/server').default
const messages = require('../src/messages').default

i18next.init(messages)
const fr = i18next.getFixedT('fr')
const en = i18next.getFixedT('en')

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

describe('I18n', () => {
  let app

  beforeEach(async () => {
    app = Server({
      mailer: fakeSGmail,
      receivingAddress: 'test@sink.sendgrid.net',
    })
  })

  it('shows purchase description in the language specified by the Accept-Language header', async () => {
    let lang = 'fr-CA'
    let response = await request(app)
      .post('/graphql')
      .set('Accept-Language', lang)
      .set('Content-Type', 'application/graphql; charset=utf-8').send(`
        query {
          __schema {
              mutationType {
                fields {
                  name
                  description
                }
              }
            }
          }
        `)
    let { mutationType } = response.body.data.__schema
    let [first, ..._] = mutationType.fields
    expect(first.description).toEqual(fr('mutation.fields.decline.description'))
  })

  it('it translates the arg descriptions', async () => {
    let lang = 'fr-CA'
    let response = await request(app)
      .post('/graphql')
      .set('Accept-Language', lang)
      .set('Content-Type', 'application/graphql; charset=utf-8').send(`
        query {
          __schema {
              mutationType {
                fields {
                  name
                  args {
                    name
                    description
                  }
                }
              }
            }
          }
        `)
    let { mutationType } = response.body.data.__schema
    var [decline, ..._] = mutationType.fields
    var [uci, ..._] = decline.args // expiry is the first argument
    expect(uci.description).toEqual(fr('mutation.fields.decline.args.uci'))
  })

  it('defaults to the en locale if no Accept-Language header is sent', async () => {
    let response = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/graphql; charset=utf-8').send(`
        query {
          __schema {
              mutationType {
                fields {
                  name
                  description
                }
              }
            }
          }
        `)
    let [decline, ..._] = response.body.data.__schema.mutationType.fields
    expect(decline.description).toEqual(
      en('mutation.fields.decline.description'),
    )
  })
})
