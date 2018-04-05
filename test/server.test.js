/**
 * @jest-environment node
 */

import request from 'supertest'
import server from '../src/server'

describe('Server Side Rendering', () => {
  it('renders the register page by default', async () => {
    let response = await request(server).get('/')

    expect(response.text).toMatch(/Register/)
  })

  it('renders the calendar at /calendar', async () => {
    let response = await request(server).get('/calendar')
    expect(response.text).toMatch(/Calendar/)
  })

  it('renders availability information at /availability', async () => {
    let response = await request(server).get('/availability')
    expect(response.text).toMatch(/Availability/)
  })

  it('renders a reassuring confirmation message at /confirmation', async () => {
    let response = await request(server).get('/confirmation')
    expect(response.text).toMatch(/confirmation/)
  })
})
