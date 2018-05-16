import React from 'react'
import { mount } from 'enzyme'
import { Submission } from '../Submission'
import { SUBMIT } from '../../queries'
import { ApolloProvider } from 'react-apollo'
import makeFakeClient from '../../utils/makeFakeClient'

const flushPromises = () => new Promise(resolve => setImmediate(resolve))

describe('<Submission />', () => {
  it(`calls its child as a function`, async () => {
    const client = makeFakeClient({
      resolveWith: {
        decline: {
          requestId: '038b6057-522a-11e8-814e-33982dd8b3f6',
          messageId:
            '010001633c013ade-12a872ec-bc5c-44e0-83b8-e00e510acbbb-000000',
          __typename: 'MailResponse',
        },
      },
    })

    const successSpy = jest.fn(() => null)
    const failureSpy = jest.fn(() => null)
    const spy = jest.fn((submit, ...args) => (
      <div
        onClick={() =>
          submit({
            fullname: 'Mike',
            explanation: 'meh',
            reason: 'adsf',
            paperFileNumber: '12341235',
          })
        }
      >
        foo
      </div>
    ))

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Submission action={SUBMIT} success={successSpy} failure={failureSpy}>
          {spy}
        </Submission>
      </ApolloProvider>,
    )

    // Find the div returned by our mock
    wrapper.find('div').simulate('click')
    await flushPromises()
    expect(spy).toBeCalled()
    expect(typeof spy.mock.calls[0][0]).toEqual('function')
  })

  it(`calls the success prop when there is data`, async () => {
    const client = makeFakeClient({
      resolveWith: {
        decline: {
          requestId: '038b6057-522a-11e8-814e-33982dd8b3f6',
          messageId:
            '010001633c013ade-12a872ec-bc5c-44e0-83b8-e00e510acbbb-000000',
          __typename: 'MailResponse',
        },
      },
    })
    const data = {
      fullname: 'Mike',
      explanation: 'meh',
      reason: 'adsf',
      paperFileNumber: '12341235',
    }

    const successSpy = jest.fn(data => <div>success</div>)
    const failureSpy = jest.fn(err => null)
    const spy = jest.fn(submit => <div onClick={() => submit(data)}>foo</div>)

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Submission action={SUBMIT} success={successSpy} failure={failureSpy}>
          {spy}
        </Submission>
      </ApolloProvider>,
    )

    // Find the div returned by our mock
    wrapper.find('div').simulate('click')
    await flushPromises()
    expect(successSpy.mock.calls.length).toEqual(1)
    expect(typeof successSpy.mock.calls[0][0]).toEqual('object')
  })

  it(`calls the failure prop with an errors array when there is an GraphQL error`, async () => {
    const client = makeFakeClient({
      resolveWith: {
        errors: [
          {
            message: 'sadness',
            locations: [{ line: 2, column: 3 }],
            path: ['decline'],
          },
        ],
        decline: null,
      },
    })

    const successSpy = jest.fn(data => <div>success</div>)
    const failureSpy = jest.fn(err => <div>error</div>)
    const spy = jest.fn(submit => <div onClick={() => submit()}>foo</div>)

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Submission action={SUBMIT} success={successSpy} failure={failureSpy}>
          {spy}
        </Submission>
      </ApolloProvider>,
    )

    wrapper.find('div').simulate('click')
    await flushPromises()
    expect(failureSpy).toHaveBeenCalled()
    expect(Array.isArray(failureSpy.mock.calls[0][0])).toEqual(true)
    // first element of the first argument of the first call
    expect(failureSpy.mock.calls[0][0][0].message).toEqual('sadness')
  })

  it(`calls the failure prop with an errors array when there is a Network error`, async () => {
    const client = makeFakeClient({
      fail: true,
      failWith: Error('omg where is the api??? 🤷‍♀️'),
    })

    const successSpy = jest.fn(data => <div>success</div>)
    const failureSpy = jest.fn(err => <div>error</div>)
    const spy = jest.fn(submit => <div onClick={() => submit()}>foo</div>)

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Submission action={SUBMIT} success={successSpy} failure={failureSpy}>
          {spy}
        </Submission>
      </ApolloProvider>,
    )

    wrapper.find('div').simulate('click')
    await flushPromises()
    expect(failureSpy).toHaveBeenCalled()
    // first element of the first argument of the first call
    expect(failureSpy.mock.calls[0][0].message).toEqual(
      'Network error: omg where is the api??? 🤷‍♀️',
    )
  })
})
