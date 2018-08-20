import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { setStoreCookie, getStoreCookie, setSSRCookie } from './cookies'
import { contextDefault, Context } from './context'
import { I18nProvider } from 'lingui-react'
import { catalogs, linguiDev } from './utils/linguiUtils'
import { trimInput } from './utils/cleanInput'

const _whitelist = ({ val, fields }) => {
  /*
  filter a dict by whitelisted keys
  returns new object -- does not mutate passed-in object
  https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  */
  return Object.keys(val)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: val[key], // eslint-disable-line security/detect-object-injection
      }
    }, {})
}

export const _isNonEmptyObject = val => {
  /* make sure passed-in value is a non-empty object */
  if (
    val === null ||
    typeof val !== 'object' ||
    Array.isArray(val) ||
    Object.keys(val).length === 0
  ) {
    return false
  }
  return true
}

function withProvider(WrappedComponent) {
  class WithProvider extends Component {
    static async getInitialProps({ res, req, match }) {
      let { query } = req
      let prevCookie = getStoreCookie(req.cookies)
      let newCookie

      // if a query string exists
      if (Object.keys(query).length) {
        let { key, val } = WithProvider.returnKeyAndValue(query, match)
        // if _any_ valid values exist, this returns a whitelisted + validated object
        // else false
        val = WithProvider.validateCookie(key, val)
        if (val) {
          newCookie = setSSRCookie(res, key, val, prevCookie)

          // add redirect if query passes validation and .redirect exists on the page component
          if (WrappedComponent.redirect && WithProvider.validateQuery(query)) {
            res.locals.redirect = WrappedComponent.redirect
          }
        }
      }

      // if no cookies exist, check for default accept-language header
      if (!newCookie && !prevCookie) {
        let language = WithProvider.getDefaultLanguageFromHeader(req.headers)
        // if default language found, set a new cookie
        newCookie = language
          ? setSSRCookie(res, 'language', language, prevCookie)
          : newCookie
      }

      let initStore = newCookie || prevCookie || contextDefault.store

      return {
        context: {
          store: initStore,
          setStore: contextDefault.setStore,
        },
      }
    }

    constructor(props) {
      super(props)

      this.setStore = (key, obj = null) => {
        obj = WithProvider.validateCookie(key, obj)
        if (!obj) {
          return
        }

        let newState = { [key]: obj }

        this.setState(
          state => ({
            context: {
              store: { ...state.context.store, ...newState },
              setStore: state.context.setStore,
            },
          }),
          () => {
            /* console.log('setting a cookie! ', this.state.context.store) */
            setStoreCookie(Cookies.set.bind(Cookies), this.state.context.store)
          },
        )
      }

      let initStore = props.context
        ? props.context.store
        : getStoreCookie(Cookies.get()) || contextDefault.store

      this.state = {
        context: {
          store: initStore,
          setStore: this.setStore,
        },
      }
    }

    render() {
      // don't pass in the context as props -- we're passing the state instead
      const { context, ...props } = this.props // eslint-disable-line no-unused-vars
      return (
        <Context.Provider value={this.state.context}>
          <I18nProvider
            language={this.state.context.store.language}
            catalogs={catalogs}
            development={linguiDev}
          >
            <WrappedComponent {...props} />
          </I18nProvider>
        </Context.Provider>
      )
    }

    static get globalFields() {
      return ['language']
    }

    static validate(values) {
      let errors = {}
      if (!['en', 'fr'].includes(values.language)) {
        errors.language = true
      }
      return errors
    }

    static returnKeyAndValue(query, match) {
      if (!Object.keys(query).length) {
        return { key: undefined, val: undefined }
      }

      /*
      return the first matching query key that exists in the global fields
      */
      let queryKeys = Object.keys(query)
      for (let i = 0; i < queryKeys.length; i++) {
        let queryKey = queryKeys[i] // eslint-disable-line security/detect-object-injection
        for (let j = 0; j < WithProvider.globalFields.length; j++) {
          // eslint-disable-next-line security/detect-object-injection
          if (queryKey === WithProvider.globalFields[j]) {
            // eslint-disable-next-line security/detect-object-injection
            return { key: queryKey, val: query[queryKey] }
          }
        }
      }

      // match.path === "/about" or similar
      let key = match.path.slice(1)
      return { key, val: query }
    }

    static getDefaultLanguageFromHeader(headers) {
      if (headers && headers['accept-language']) {
        // grab the first two characters
        let val = headers['accept-language'].slice(0, 2)
        let errors = WithProvider.validate({ language: val })

        return !Object.keys(errors).length ? val : false
      }

      return false
    }

    static validateCookie(key, val = null) {
      /*
      validation method for both server-side and client-side cookies
      returns either a sanitised `val` object else false
      */

      if (typeof key !== 'string' || !key.length) {
        throw new Error('validate: `key` must be a non-empty string')
      }

      // check if a global setting
      if (WithProvider.globalFields.includes(key)) {
        // val must be a string
        if (typeof val !== 'string' || !val.length) {
          throw new Error('validate: `val` must be a non-empty string')
        }

        // have to pass the key in as well since this value is a string
        let errors = WithProvider.validate({ [key]: val })

        // return the value if no validation errors
        return !Object.keys(errors).length ? val : false
      }

      const fields = WrappedComponent.fields
      const validate = WrappedComponent.validate

      // else, check if a non-global setting
      if (
        fields &&
        fields.length && // there are fields explicitly defined
        typeof validate === 'function' && // there is a validate function passed-in
        _isNonEmptyObject(val) && // val is a non-empty object
        Object.keys(val).some(k => fields.includes(k)) // at least one query param key exists in fields
      ) {
        // whitelist query keys so that arbitrary keys aren't saved to the store
        val = _whitelist({ val, fields })

        val = trimInput(val)

        // clear values that don't pass validation
        let errors = validate(val)
        Object.keys(errors).forEach(field => {
          val[field] = '' // eslint-disable-line security/detect-object-injection
        })

        // return the sanitised val
        return val
      }

      return false
    }

    static validateQuery(query) {
      let queryKeys = Object.keys(query)
      if (!queryKeys.length) {
        return false
      }

      let validateFn = WrappedComponent.validate || (() => false)
      let pageFields = WrappedComponent.fields || []

      let errors = validateFn(query)
      // check if all of the same keys in the query are on the page
      // ie, they haven't added any or submitted only half of them
      let allKeys =
        queryKeys.length === pageFields.length &&
        queryKeys.every(key => pageFields.includes(key))

      // check if no errors in query and all of the keys are present
      return Object.keys(errors).length === 0 && allKeys === true ? true : false
    }
  }
  WithProvider.propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      setStore: null,
    }),
  }
  return WithProvider
}

export default withProvider
