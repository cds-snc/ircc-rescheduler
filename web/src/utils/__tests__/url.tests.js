import { checkURLParams } from '../url'

describe('Checks query params', () => {
  it("Will ignore params that don't exists in fields", () => {
    const fields = ['fullName', 'email']
    const result = checkURLParams(
      '?utm_source=BELA%20email&utm_medium=email',
      fields,
    )
    expect(result).toEqual(false)
  })

  it('Will match when params exists in fields', () => {
    const fields = ['fullName', 'email']
    const result = checkURLParams(
      '?utm_source=BELA%20email&utm_medium=email&email=test@example.com',
      fields,
    )
    expect(result).toEqual(true)
  })
})
