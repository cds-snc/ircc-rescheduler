/**
 * @jest-environment node
 */

import request from 'supertest'
import server from '../src/server'

describe('Server Side Rendering', () => {
  it('renders the landing page at /', async () => {
    let response = await request(server).get('/')

    expect(response.text).toMatch(/Use this service to notify IRCC/)
  })

  it('renders the register page at /register', async () => {
    let response = await request(server).get('/register')

    expect(response.text).toMatch(/Full name/)
  })

  it('renders the calendar at /calendar', async () => {
    let response = await request(server).get('/calendar')
    expect(response.text).toMatch(/Use the calendar to select./)
  })

  it('renders the calendar at /review', async () => {
    let response = await request(server).get('/review')
    expect(response.text).toMatch(/Review your request before sending it:/)
  })

  it('renders a reassuring confirmation message at /confirmation', async () => {
    let response = await request(server).get('/confirmation')
    expect(response.text).toMatch(/Thank you! Your request has been received./)
  })
})
