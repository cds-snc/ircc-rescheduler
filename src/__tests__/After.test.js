import React from 'react'
import MemoryRouter from 'react-router-dom/MemoryRouter'
import { After } from '@jaredpalmer/after'
import routes from '../routes'
import { mount } from 'enzyme'

describe('After.js', () => {
  it('renders without exploding', () => {
    expect(() => {
      mount(
        <MemoryRouter>
          <After data={{}} routes={routes} />
        </MemoryRouter>,
      )
    }).not.toThrow()
  })
})
