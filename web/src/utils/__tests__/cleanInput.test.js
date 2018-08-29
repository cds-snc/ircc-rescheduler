import { trimInput, cleanArray } from '../cleanInput'

describe('Clean inputs', () => {
  it('handles an object of strings with whitespace at the start', () => {
    const vals = { fullName: '    John Li', email: '     john@li.com' }
    const cleaned = trimInput(vals)
    expect(cleaned.fullName).toEqual('John Li')
    expect(cleaned.email).toEqual('john@li.com')
  })

  it('handles an object of strings with whitespace at the end', () => {
    const vals = { fullName: 'John Li     ', email: 'john@li.com    ' }
    const cleaned = trimInput(vals)
    expect(cleaned.fullName).toEqual('John Li')
    expect(cleaned.email).toEqual('john@li.com')
  })

  it('handles an array of strings', () => {
    const vals = { dates: ['2018-01-31   ', '    2018-02-01'] }
    const cleaned = cleanArray(vals.dates)
    expect(cleaned[0]).toEqual('2018-01-31')
  })

  it('handles strings and array of strings', () => {
    const vals = {
      fullName: 'John Li     ',
      email: 'john@li.com    ',
      dates: ['2018-01-31   ', '    2018-02-01'],
    }

    const cleaned = trimInput(vals)
    expect(cleaned.fullName).toEqual('John Li')
    expect(cleaned.email).toEqual('john@li.com')
    expect(cleaned.dates[0]).toEqual('2018-01-31')
  })
})
