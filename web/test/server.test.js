/**
 * @jest-environment node
 */

import request from 'supertest'
import server from '../src/server'

describe('Server Side Rendering', () => {
  it('renders the landing page at /', async () => {
    let response = await request(server).get('/')
    expect(response.text).toMatch(
      /It can take up to 9 weeks for us to reschedule you./,
    )
  })

  it('renders the register page at /register', async () => {
    let response = await request(server).get('/register')
    expect(response.text).toMatch(/Full name/)
  })

  it('renders the calendar page at /calendar', async () => {
    let response = await request(server).get('/calendar')
    expect(response.text).toMatch(/Citizenship appointments are scheduled on/)
  })

  it('renders the review page at /review', async () => {
    let response = await request(server).get('/review')
    expect(response.text).toMatch(/Review your request/)
  })

  it('renders a reassuring confirmation message at /confirmation', async () => {
    let response = await request(server).get('/confirmation')
    expect(response.text).toMatch('Thank you! Your request has been received.')
  })

  it('has xss protection', async () => {
    let response = await request(server).get('/')
    expect(response.header['x-xss-protection']).toEqual('1; mode=block')
  })

  it('has nosniff enabled', async () => {
    let response = await request(server).get('/')
    expect(response.header['x-content-type-options']).toEqual('nosniff')
  })

  it('has frame protection', async () => {
    let response = await request(server).get('/')
    expect(response.header['x-frame-options']).toEqual('DENY')
  })
  it('has no-store protection', async () => {
    let response = await request(server).get('/')
    expect(response.header['surrogate-control']).toEqual('no-store')
  })
})
