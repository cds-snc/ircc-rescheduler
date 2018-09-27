import withProvider, { _isNonEmptyObject } from '../withProvider'

class FakeComponentEmpty {
  constructor() {}
}

class FakeComponentWithFields {
  static get fields() {
    return ['field']
  }
}

class FakeComponentWithValidate {
  static validate(values) {
    let errors = {}
    if (!values.field !== 'value') {
      errors.field = true
    }
    return errors
  }
  constructor() {}
}

class FakeComponentWithFieldsAndValidate {
  static get fields() {
    return ['field']
  }
  static validate(values) {
    let errors = {}
    if (values.field !== 'value') {
      errors.field = true
    }
    return errors
  }
  constructor() {}
}

class FakeComponentWithMultipleFieldsAndValidate {
  static get fields() {
    return ['field1', 'field2']
  }
  static validate(values) {
    let errors = {}
    if (values.field1 !== 'value1') {
      errors.field1 = true
    }
    if (values.field2 !== 'value2') {
      errors.field2 = true
    }
    return errors
  }
  constructor() {}
}

describe('_isNonEmptyObject', () => {
  let invalidVals = [0, false, {}, ['value'], null, '', 'value']
  invalidVals.map(v => {
    it(`returns false for non-empty object value: ${JSON.stringify(v)}`, () => {
      expect(_isNonEmptyObject(v)).toEqual(false)
    })
  })

  let validVals = [{ a: 'b' }, { a: '' }, { a: null }]
  validVals.map(v => {
    it(`returns true for non-empty object value: ${JSON.stringify(v)}`, () => {
      expect(_isNonEmptyObject(v)).toEqual(true)
    })
  })
})

describe('WithProvider', () => {
  describe('.globalFields and .validate()', () => {
    const WithProvider = withProvider(FakeComponentEmpty)

    it('has only "language" as a global field', () => {
      expect(WithProvider.globalFields).toEqual(['language'])
    })

    it('returns no errors for "en" or "fr" in its validation method', () => {
      let errors
      errors = WithProvider.validate({ language: 'en' })
      expect(errors).toEqual({})

      errors = WithProvider.validate({ language: 'fr' })
      expect(errors).toEqual({})
    })

    it('returns errors for some other value in its validation method', () => {
      let errors
      errors = WithProvider.validate({ language: 'portuguese' })
      expect(errors).toEqual({ language: true })
    })

    it('returns errors for an empty language value', () => {
      let errors
      errors = WithProvider.validate({ language: '' })
      expect(errors).toEqual({ language: true })
    })
  })

  describe('.returnKeyAndValue()', () => {
    const WithProvider = withProvider(FakeComponentEmpty)
    let match = { path: '/about' }

    it('undefined key and val when no query passed in', () => {
      let { key, val } = WithProvider.returnKeyAndValue({}, match)
      expect(key).toBe(undefined)
      expect(val).toBe(undefined)
    })

    it('"language" key and "en" val when global field passed in', () => {
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'en' },
        match,
      )
      expect(key).toBe('language')
      expect(val).toBe('en')
    })

    it('"language" key and "portuguese" val when global field passed in', () => {
      // ie, it's not running the validateCookie function
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'portuguese' },
        match,
      )
      expect(key).toBe('language')
      expect(val).toBe('portuguese')
    })

    it('"language" key and "en" val when global field passed in as well as other keys', () => {
      // other fields will be ignored
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'en', field: 'value' },
        match,
      )
      expect(key).toBe('language')
      expect(val).toBe('en')
    })

    it('path key and query value when no global key exists ', () => {
      // other fields will be ignored
      let { key, val } = WithProvider.returnKeyAndValue(
        { field: 'value' },
        match,
      )
      expect(key).toBe('about')
      expect(val).toEqual({ field: 'value' })
    })

    it('path key remains "/" when root path and no global key exists ', () => {
      // other fields will be ignored
      let { key, val } = WithProvider.returnKeyAndValue(
        { field: 'value' },
        { path: '/' },
      )
      expect(key).toBe('/')
      expect(val).toEqual({ field: 'value' })
    })
  })

  describe('.getDefaultLanguageFromHeader()', () => {
    const WithProvider = withProvider(FakeComponentEmpty)

    let emptyHeaders = [undefined, false, null, '', {}]
    emptyHeaders.map(v => {
      it(`returns false when an empty header is passed in: ${v}`, () => {
        expect(WithProvider.getDefaultLanguageFromHeader(v)).toBe(false)
      })
    })

    let nonMatchingHeaders = [
      { 'accept-encoding': 'gzip, deflate' },
      { accept: 'text/html' },
      // in express, they all come through as lower-case, so we aren't matching this
      { 'Accept-Language': 'en' },
    ]
    nonMatchingHeaders.map(v => {
      it(`returns false when header passed in without 'accept-language': ${JSON.stringify(
        v,
      )}`, () => {
        expect(WithProvider.getDefaultLanguageFromHeader(v)).toBe(false)
      })
    })

    let nonMatchingLanguages = [
      { 'accept-language': 'de' },
      { 'accept-language': 'es-MX,es,en;' },
      { 'accept-language': 'zh,en;q=0.9,fr;q=0.8' },
    ]
    nonMatchingLanguages.map(v => {
      it(`returns false when 'accept-language' header passed in that doesn't start with "en" or "fr"': ${
        v['accept-language']
      }`, () => {
        expect(WithProvider.getDefaultLanguageFromHeader(v)).toBe(false)
      })
    })

    let enLanguages = [
      { 'accept-language': 'en' },
      { 'accept-language': 'en-CA,en-US,en' },
      { 'accept-language': 'en-US,en;q=0.9,fr;q=0.8' },
    ]
    enLanguages.map(v => {
      it(`returns "en" when 'accept-language' header passed in that starts with "en"': ${
        v['accept-language']
      }`, () => {
        expect(WithProvider.getDefaultLanguageFromHeader(v)).toBe('en')
      })
    })

    let frLanguages = [
      { 'accept-language': 'fr' },
      { 'accept-language': 'fr-CA,fr-FR,fr' },
      { 'accept-language': 'fr-CA,fr;q=0.9,en;q=0.6' },
    ]
    frLanguages.map(v => {
      it(`returns "fr" when 'accept-language' header passed in that starts with "fr"': ${
        v['accept-language']
      }`, () => {
        expect(WithProvider.getDefaultLanguageFromHeader(v)).toBe('fr')
      })
    })
  })

  describe('.validateQuery()', () => {
    const EmptyWithProvider = withProvider(FakeComponentEmpty)
    const WithProviderFields = withProvider(FakeComponentWithFields)
    const WithProviderValidate = withProvider(FakeComponentWithValidate)
    const WithProvider = withProvider(FakeComponentWithFieldsAndValidate)

    it('returns false when WrappedComponent has no fields or validate functions', () => {
      let result = EmptyWithProvider.validateQuery({ field: 'value' })
      expect(result).toBe(false)
    })

    it('returns false when WrappedComponent has no fields', () => {
      let result = WithProviderValidate.validateQuery({ field: 'value' })
      expect(result).toBe(false)
    })

    it('returns false when WrappedComponent has no fields and no query is passed in', () => {
      let result = WithProviderValidate.validateQuery({})
      expect(result).toBe(false)
    })

    it('returns true when WrappedComponent has a matching field but no validation method', () => {
      // if we have no validation method we are allowing anything to be saved 🤷‍
      let result = WithProviderFields.validateQuery({ field: 'value' })
      expect(result).toBe(true)
    })

    it('returns true when WrappedComponent has a matching field and validation passes', () => {
      let result = WithProvider.validateQuery({ field: 'value' })
      expect(result).toBe(true)
    })

    it('returns false when query is empty', () => {
      let result = WithProvider.validateQuery({})
      expect(result).toBe(false)
    })

    it('returns true when not all keys submitted', () => {
      class FakeComponentWithTwoFields {
        static get fields() {
          return ['field1', 'field2']
        }
      }

      let result = withProvider(FakeComponentWithTwoFields).validateQuery({
        field1: 'value1',
      })
      expect(result).toBe(true)
    })

    it('returns false when too many keys are submitted', () => {
      let result = WithProvider.validateQuery({
        field: 'value',
        field1: 'value1',
      })
      expect(result).toBe(false)
    })
  })

  describe('.validateCookie() with global field', () => {
    const WithProvider = withProvider(FakeComponentEmpty)

    // static validateCookie(key, val = null, fields = [], validate = null)
    it('returns correct language for "en"', () => {
      let result = WithProvider.validateCookie('language', 'en')
      expect(result).toEqual('en')
    })

    it('returns correct language for "fr"', () => {
      let result = WithProvider.validateCookie('language', 'fr')
      expect(result).toEqual('fr')
    })

    it('returns false for different language', () => {
      let result = WithProvider.validateCookie('language', 'portuguese')
      expect(result).toBe(false)
    })

    let invalidVals = [0, false, { language: 'en' }, ['en'], null, '']
    invalidVals.map(v => {
      it(`throws error for global field with a non-empty string value: ${v}`, () => {
        expect(() => {
          WithProvider.validateCookie('language', v)
        }).toThrowError(/^validate: `val` must be a non-empty string$/)
      })
    })
  })

  describe('.validateCookie() with regular field', () => {
    describe('WrappedComponent without `fields` and `validate`', () => {
      const EmptyWithProvider = withProvider(FakeComponentEmpty)
      const WithProviderFields = withProvider(FakeComponentWithFields)
      const WithProviderValidate = withProvider(FakeComponentWithValidate)

      it('returns false if WrappedComponent does not have `fields` or `validate`', () => {
        let result = EmptyWithProvider.validateCookie('field', 'value')
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `validate`', () => {
        let result = WithProviderFields.validateCookie('field', 'value')
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `fields`', () => {
        let result = WithProviderValidate.validateCookie('field', 'value')
        expect(result).toBe(false)
      })
    })

    describe('WrappedComponent has `fields` and `validate`', () => {
      const WithProvider = withProvider(FakeComponentWithFieldsAndValidate)

      it('returns original object when validation passes', () => {
        let result = WithProvider.validateCookie('page', { field: 'value' })
        expect(result).toEqual({ field: 'value' })
      })

      it('returns trimmed string values when validation passes trimmed value', () => {
        let result = WithProvider.validateCookie('page', { field: ' value ' })
        expect(result).toEqual({ field: 'value' })

        let result2 = WithProvider.validateCookie('page', { field: 'value   ' })
        expect(result2).toEqual({ field: 'value' })
      })

      let invalidVals = [0, false, {}, ['value'], null, '', 'value']
      invalidVals.map(v => {
        it(`returns false for regular field with a non-empty object value: ${JSON.stringify(
          v,
        )}`, () => {
          expect(WithProvider.validateCookie('page', v)).toBe(false)
        })
      })

      it('removes invalid keys from original object', () => {
        let result = WithProvider.validateCookie('page', {
          field: 'value',
          field2: 'value2',
        })
        expect(result).toEqual({ field: 'value' })
      })

      it('sets value to an empty string when key is valid but value is invalid', () => {
        let result = WithProvider.validateCookie('page', {
          field: 'wrong value',
        })
        expect(result).toEqual({ field: '' })
      })

      it('returns false when no keys are valid', () => {
        let result = WithProvider.validateCookie('page', {
          field2: 'value2',
          field3: 'value3',
        })
        expect(result).toEqual(false)
      })

      it('does not mutate original object', () => {
        // original object has too many keys
        let val1 = { field: 'value', field2: 'value2' }
        let result1 = WithProvider.validateCookie('page', val1)
        expect(result1).toEqual({ field: 'value' })
        //check that the keys are still there
        expect(val1).toEqual({ field: 'value', field2: 'value2' })

        // original object has invalid value
        let val2 = { field: 'wrong value' }
        let result2 = WithProvider.validateCookie('page', val2)
        expect(result2).toEqual({ field: '' })
        // check that the original value is still there
        expect(val2).toEqual({ field: 'wrong value' })
      })
    })

    describe('WrappedComponent has multiple `fields` and `validate`', () => {
      const WithProvider = withProvider(
        FakeComponentWithMultipleFieldsAndValidate,
      )
      it('returns original object when validation passes', () => {
        let result = WithProvider.validateCookie('page', {
          field1: 'value1',
          field2: 'value2',
        })
        expect(result).toEqual({
          field1: 'value1',
          field2: 'value2',
        })
      })
      let vals = [
        // only one valid key is passed in
        {
          val: { field1: 'value1' },
          res: { field1: 'value1', field2: '' },
        },
        // only one invalid key is passed in
        {
          val: { field1: 'wrong value' },
          res: { field1: '', field2: '' },
        },
        // two keys are passed in, one invalid
        {
          val: { field1: 'wrong value', field2: 'value2' },
          res: { field1: '', field2: 'value2' },
        },
        // two keys are passed in, both invalid
        {
          val: { field1: 'wrong value', field2: 'wrong value 2' },
          res: { field1: '', field2: '' },
        },
        // two keys are passed in, both empty
        {
          val: { field1: '', field2: '' },
          res: { field1: '', field2: '' },
        },
        // two keys are passed in, both valid, plus an extra key
        {
          val: { field1: 'value1', field2: 'value2', badKey: 'wrong value' },
          res: { field1: 'value1', field2: 'value2' },
        },
        // two keys are passed in, one valid, plus an extra key
        {
          val: {
            field1: 'value1',
            field2: 'wrong value',
            badKey: 'wrong value 2',
          },
          res: { field1: 'value1', field2: '' },
        },
        // two keys are passed in, both invalid, plus an extra key
        {
          val: {
            field1: 'wrong value',
            field2: 'wrong value 2',
            badKey: 'wrong value 3',
          },
          res: { field1: '', field2: '' },
        },
        // no valid keys are passed in
        {
          val: {
            badKey: 'wrong value',
          },
          res: false,
        },
      ]
      vals.map(({ val, res }) => {
        it(`val: ${JSON.stringify(val)}, res: ${JSON.stringify(res)}`, () => {
          let result = WithProvider.validateCookie('page', val)
          expect(result).toEqual(res)
        })
      })
    })
  })
})
