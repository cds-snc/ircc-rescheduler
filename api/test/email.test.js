const buildParams = require('../src/email')

const options = {
  htmlTemplate: '_test-rich',
  plainTemplate: '_test-plain',
  formValues: {
    fullName: 'John Li',
    paperFileNumber: '123456',
    availability: ['2018-06-26', '2018-06-29', '2018-07-31'],
  },
  url: 'http://test.com',
  receivingAddress: 'receive@null.com',
  sendingAddress: 'send@null.com',
}

describe('Email', () => {
  it('is properly sets destination address', async () => {
    const data = await buildParams(options)
    expect(data.Destination.ToAddresses[0]).toEqual('receive@null.com')
  })

  it('is properly sets reply address', async () => {
    const data = await buildParams(options)
    expect(data.ReplyToAddresses[0]).toEqual('send@null.com')
  })

  it('renders html email markup with inline styles & variables', async () => {
    const data = await buildParams(options)
    expect(data.Message.Body.Html.Data).toEqual(
      '<div class="title" style="color: red;">Citizenship Test – John Li</div>',
    )
  })

  it('renders plain text email with variables', async () => {
    const data = await buildParams(options)
    expect(data.Message.Body.Text.Data).toEqual(
      'John Li requested a new Citizenship Test appointment',
    )
  })
})
