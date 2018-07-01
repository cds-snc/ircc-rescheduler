import React from 'react'
import MemoryRouter from 'react-router-dom/MemoryRouter'
import { After } from '@jaredpalmer/after'
import routes from '../routes'
import { mount } from 'enzyme'
// TODO: switch the project over to unfetch.
import fetch from 'unfetch' // eslint-disable-line no-unused-vars

describe('After.js', () => {
  it.skip('renders without exploding', () => {
    expect(() => {
      mount(
        <MemoryRouter>
          <After data={{}} routes={routes} />
        </MemoryRouter>,
      )
    }).not.toThrow()
  })
})
