import React from 'react'
import { mount } from 'enzyme'
import { ErrorBoundary } from '../ErrorBoundary'

const supress = ({ error = () => {}, warn = () => {}, whileExecuting }) => {
  const { error: e, warn: w } = global.console

  global.console.error = error
  global.console.warn = warn

  whileExecuting()

  global.console.error = e
  global.console.warn = w
}

describe('<ErrorBoundary />', () => {
  it('catches errors and displays a message', async () => {
    const MisbehavingChild = () => {
      throw new Error('💩')
    }

    let wrapper
    let mock = jest.fn()
    supress({
      error: mock,
      whileExecuting: () => {
        wrapper = mount(
          <ErrorBoundary onError={jest.fn()} render={() => <p>Oops!</p>}>
            <MisbehavingChild />
          </ErrorBoundary>,
        )
      },
    })
    expect(mock).toHaveBeenCalled()
    expect(wrapper.text()).toEqual('Oops!')
  })

  it('calls the onError function with the original error when an error occurs ', async () => {
    const MisbehavingChild = () => {
      throw new Error('💩')
    }

    let mock = jest.fn()
    supress({
      error: jest.fn(),
      whileExecuting: () => {
        mount(
          <ErrorBoundary onError={mock} render={() => <p>Oops!</p>}>
            <MisbehavingChild />
          </ErrorBoundary>,
        )
      },
    })
    expect(mock.mock.calls[0][0] instanceof Error).toBeTruthy()
  })

  it('works without an onError function', async () => {
    const MisbehavingChild = () => {
      throw new Error('💩')
    }

    let wrapper
    supress({
      error: jest.fn(),
      whileExecuting: () => {
        wrapper = mount(
          <ErrorBoundary render={() => <p>Oops!</p>}>
            <MisbehavingChild />
          </ErrorBoundary>,
        )
      },
    })
    expect(wrapper.text()).toEqual('Oops!')
  })
})
