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

    it('has only "language" and "location" as global fields', () => {
      expect(WithProvider.globalFields).toEqual(['language', 'location'])
    })

    describe('global field "language"', () => {
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

    describe('global field "location"', () => {
      it('returns no errors for "montreal" or "vancouver" in its validation method', () => {
        let errors
        errors = WithProvider.validate({ location: 'montreal' })
        expect(errors).toEqual({})

        errors = WithProvider.validate({ location: 'vancouver' })
        expect(errors).toEqual({})
      })

      it('returns errors for some other value in its validation method', () => {
        let errors
        errors = WithProvider.validate({ location: 'toronto' })
        expect(errors).toEqual({ location: true })
      })

      it('returns errors for an empty location value', () => {
        let errors
        errors = WithProvider.validate({ location: '' })
        expect(errors).toEqual({ location: true })
      })
    })

    describe('global fields "language" and "location"', () => {
      it('returns no errors when both global fields are valid', () => {
        let errors
        errors = WithProvider.validate({ language: 'en', location: 'montreal' })
        expect(errors).toEqual({})

        errors = WithProvider.validate({
          language: 'fr',
          location: 'vancouver',
        })
        expect(errors).toEqual({})
      })

      it('returns errors when one global field is invalid', () => {
        let errors
        errors = WithProvider.validate({ language: 'en', location: 'toronto' })
        expect(errors).toEqual({ location: true })

        errors = WithProvider.validate({
          language: 'portuguese',
          location: 'montreal',
        })
        expect(errors).toEqual({ language: true })
      })

      it('returns errors when both global fields are invalid', () => {
        let errors
        errors = WithProvider.validate({
          language: 'portuguese',
          location: 'toronto',
        })
        expect(errors).toEqual({ language: true, location: true })
      })

      it('returns errors when both global fields are empty', () => {
        let errors
        errors = WithProvider.validate({ language: '', location: '' })
        expect(errors).toEqual({ language: true, location: true })
      })
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

    const globals = [
      {
        valid: { language: 'en' },
        invalid: { language: 'portuguese' },
      },
      {
        valid: { location: 'montreal' },
        invalid: { location: 'lisbon' },
      },
    ]
    globals.map(v => {
      it(`"GLOBALS" key and "${JSON.stringify(
        v.valid,
      )}" val when global field passed in`, () => {
        let { key, val } = WithProvider.returnKeyAndValue(v.valid, match)
        expect(key).toBe('GLOBALS')
        expect(val).toEqual(v.valid)
      })

      it(`"GLOBALS" key and "${JSON.stringify(
        v.invalid,
      )}" val when global language field passed in`, () => {
        // ie, it's not running the validateCookie function
        let { key, val } = WithProvider.returnKeyAndValue(v.invalid, match)
        expect(key).toBe('GLOBALS')
        expect(val).toEqual(v.invalid)
      })

      it(`"GLOBALS" key and "${JSON.stringify(
        v.valid,
      )}" val when global language field passed in as well as other keys`, () => {
        // other fields will be ignored
        let { key, val } = WithProvider.returnKeyAndValue(
          { ...v.valid, field: 'value' },
          match,
        )
        expect(key).toBe('GLOBALS')
        expect(val).toEqual(v.valid)
      })
    })

    it(`"GLOBALS" key and both global values when global language fields are passed in`, () => {
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'en', location: 'montreal' },
        match,
      )
      expect(key).toBe('GLOBALS')
      expect(val).toEqual({ language: 'en', location: 'montreal' })
    })

    it(`"GLOBALS" key and both global values when invalid global language fields are passed in`, () => {
      // ie, it's not running the validateCookie function
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'portuguese', location: 'lisbon' },
        match,
      )
      expect(key).toBe('GLOBALS')
      expect(val).toEqual({ language: 'portuguese', location: 'lisbon' })
    })

    it(`"GLOBALS" key and both global values when global language fields are passed in as well as other fields`, () => {
      // other fields will be ignored
      let { key, val } = WithProvider.returnKeyAndValue(
        { language: 'en', location: 'montreal', field: 'value' },
        match,
      )
      expect(key).toBe('GLOBALS')
      expect(val).toEqual({ language: 'en', location: 'montreal' })
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

    it('returns false when not all keys submitted', () => {
      class FakeComponentWithTwoFields {
        static get fields() {
          return ['field1', 'field2']
        }
      }

      let result = withProvider(FakeComponentWithTwoFields).validateQuery({
        field1: 'value1',
      })
      expect(result).toBe(false)
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

    const globals = [
      {
        valid: { language: 'en' },
        invalid: { language: 'portuguese' },
      },
      {
        valid: { location: 'montreal' },
        invalid: { location: 'lisbon' },
      },
      {
        valid: { language: 'en', location: 'montreal' },
        invalid: { language: 'portuguese', location: 'lisbon' },
      },
      {
        valid: { language: 'fr', location: 'vancouver' },
        invalid: { language: '', location: '' },
      },
    ]
    globals.map(v => {
      it(`returns correct object for valid value: "${JSON.stringify(
        v.valid,
      )}"`, () => {
        let result = WithProvider.validateCookie('GLOBALS', v.valid)
        expect(result).toEqual(v.valid)
      })

      it(`returns false for invalid value: "${JSON.stringify(
        v.invalid,
      )}"`, () => {
        let result = WithProvider.validateCookie('GLOBALS', v.invalid)
        expect(result).toBe(false)
      })
    })

    it(`returns false for multiple global fields, one invalid`, () => {
      let globals = { language: 'portuguese', location: 'montreal' }
      let result = WithProvider.validateCookie('GLOBALS', globals)
      expect(result).toEqual(false)

      globals = { language: 'en', location: 'lisbon' }
      let result2 = WithProvider.validateCookie('GLOBALS', globals)
      expect(result2).toEqual(false)
    })

    let invalidVals = [0, false, {}, ['en'], null, '']
    invalidVals.map(v => {
      it(`throws error for global field with a non-empty object: ${JSON.stringify(
        v,
      )}`, () => {
        expect(() => {
          WithProvider.validateCookie('GLOBALS', v)
        }).toThrowError(/^validate: `val` must be a non-empty object/)
      })
    })
  })

  describe('.validateCookie() with regular field', () => {
    describe('WrappedComponent without `fields` and `validate`', () => {
      const EmptyWithProvider = withProvider(FakeComponentEmpty)
      const WithProviderFields = withProvider(FakeComponentWithFields)
      const WithProviderValidate = withProvider(FakeComponentWithValidate)

      it('returns false if WrappedComponent does not have `fields` or `validate`', () => {
        let result = EmptyWithProvider.validateCookie('page', {
          field: 'value',
        })
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `validate`', () => {
        let result = WithProviderFields.validateCookie('page', {
          field: 'value',
        })
        expect(result).toBe(false)
      })

      it('returns false if WrappedComponent does not have `fields`', () => {
        let result = WithProviderValidate.validateCookie('page', {
          field: 'value',
        })
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
          expect(() => {
            WithProvider.validateCookie('page', v)
          }).toThrowError(/^validate: `val` must be a non-empty object/)
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

  describe('.validateCookie() with global fields and regular fields', () => {
    const WithProvider = withProvider(
      FakeComponentWithMultipleFieldsAndValidate,
    )

    let vals = [
      // key GLOBALS w/ valid global field and valid regular field
      {
        key: 'GLOBALS',
        val: { language: 'en', field1: 'value1' },
        res: { language: 'en' },
      },
      // key GLOBALS w/ valid global field and invalid global field and valid regular field
      {
        key: 'GLOBALS',
        val: { language: 'en', location: 'lisbon', field1: 'value1' },
        res: false,
      },
      // key GLOBALS w/ invalid global field and invalid regular field
      {
        key: 'GLOBALS',
        val: { language: 'portuguese', field1: 'wrong value' },
        res: false,
      },
      // key GLOBALS w/ valid global field and some rando fields
      {
        key: 'GLOBALS',
        val: {
          utm_source: 'BELA email',
          utm_medium: 'email',
          location: 'montreal',
          language: 'fr',
        },
        res: { location: 'montreal', language: 'fr' },
      },
      // key GLOBALS w/ only some rando fields
      {
        key: 'GLOBALS',
        val: { utm_source: 'BELA email', utm_medium: 'email' },
        res: false,
      },
      // key 'page' w/ valid global field and valid regular fields
      {
        key: 'page',
        val: { language: 'en', field1: 'value1', field2: 'value2' },
        res: { field1: 'value1', field2: 'value2' },
      },
      // key 'page' w/ invalid global fields and one valid regular field
      {
        key: 'page',
        val: { language: 'portuguese', location: 'lisbon', field1: 'value1' },
        res: { field1: 'value1', field2: '' },
      },
      // key 'page' w/ valid global field and invalid regular field
      {
        key: 'page',
        val: { language: 'en', field1: 'wrong value' },
        res: { field1: '', field2: '' },
      },
      // key 'page' w/ only global fields
      {
        key: 'page',
        val: { language: 'en', location: 'montreal' },
        res: false,
      },
    ]
    vals.map(({ key, val, res }) => {
      it(`key: ${key}, val: ${JSON.stringify(val)}, res: ${JSON.stringify(
        res,
      )}`, () => {
        let result = WithProvider.validateCookie(key, val)
        expect(result).toEqual(res)
      })
    })
  })
})
