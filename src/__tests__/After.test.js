import React from 'react'
import ReactDOM from 'react-dom'
import MemoryRouter from 'react-router-dom/MemoryRouter'
import { After } from '@jaredpalmer/after'
import routes from '../routes'
import { mount } from 'enzyme'

describe('After.js', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div')
    expect(() => {
      mount(
        <MemoryRouter>
          <After data={{}} routes={routes} />
        </MemoryRouter>,
      )
    }).not.toThrow()
  })
})
