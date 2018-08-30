import { trimInput, cleanArray, deleteEmptyArrayKeys } from '../cleanInput'

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

describe('deleteEmptyArrayKeys', () => {
  it('will return empty object when single key contains empty array', () => {
    const vals = { emptyArray1: [] }
    deleteEmptyArrayKeys(vals)
    expect(vals).toMatchObject({})
  })

  it('will remove all keys containing empty arrays', () => {
    const vals = { number: 1, emptyArray1: [], emptyArray2: [] }
    deleteEmptyArrayKeys(vals)
    expect(vals).toMatchObject({ number: 1 })
  })

  const arrays = [['value'], [[]], [''], [null], [false], [{}], [0]]
  arrays.map(arr => {
    it(`will keep keys not containing empty arrays: ${JSON.stringify(
      arr,
    )}`, () => {
      const vals = { key: arr }
      deleteEmptyArrayKeys(vals)
      expect(vals).toMatchObject({ key: arr })
    })
  })
})
