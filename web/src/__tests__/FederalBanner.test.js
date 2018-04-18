import { mount } from 'enzyme'
import { ApolloProvider } from 'react-apollo'
import FederalBanner from '../FederalBanner'
import React from 'react'
import { testClient } from '../utils/createTestClient'


describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = mount(
      <ApolloProvider client={testClient({language: 'en'})}>
        <FederalBanner />
      </ApolloProvider>,
    )
    expect(federalBanner.find('svg')).toBeTruthy()
  })
})
