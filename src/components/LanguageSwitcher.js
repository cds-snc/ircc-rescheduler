import React from 'react'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import { Helmet } from 'react-helmet'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import {
  theme,
  visuallyhidden,
  visuallyhiddenMobile,
  mediaQuery,
  focusRing,
} from '../styles'
import { logEvent } from '../utils/analytics'

const button = css`
  ${focusRing};
  display: inline-block;
  font-size: ${theme.font.base};
  color: ${theme.colour.white};
  padding: 0;

  text-decoration: underline;
  border: none;
  background: transparent;
  outline-offset: 4px;

  &:hover {
    cursor: pointer;
  }

  span {
    line-height: 1;
  }
`

const hiddenOnDesktop = css`
  display: none;

  ${mediaQuery.sm(css`
    display: initial;
  `)};
`

class LanguageSwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.getNewLanguage = this.getNewLanguage.bind(this)

    let { context: { store: { language = '' } = {} } = {} } = props

    this.state = {
      language,
    }
  }

  getNewLanguage() {
    return this.state.language === 'fr' ? 'en' : 'fr'
  }

  render() {
    let {
      context: { setStore, location: { id: locationId = 'not set' } = {} } = {},
    } = this.props

    return (
      <form>
        <Helmet>
          <html lang={this.state.language} />
          <meta name="keywords" content={`location=${locationId}`} />
        </Helmet>
        <h2 className={visuallyhidden}>
          <Trans>Language Selection</Trans>
        </h2>
        <input
          id="language-id"
          name="language"
          type="hidden"
          value={this.getNewLanguage()}
        />
        <button
          className={button}
          id="language-toggle"
          onClick={e => {
            e.preventDefault()
            const lang = this.getNewLanguage()
            this.setState({ language: lang }, () =>
              setStore('language', this.state.language),
            )
            logEvent('Navigation', 'Toggle Language', lang)
          }}
        >
          <span
            className={visuallyhiddenMobile}
            aria-label={
              this.getNewLanguage() === 'fr'
                ? 'Language selection: French'
                : 'Sélection de la langue: anglais'
            }
          >
            {this.getNewLanguage() === 'fr' ? 'Français' : 'English'}
          </span>
          <span className={hiddenOnDesktop} aria-hidden="true">
            {this.getNewLanguage() === 'fr' ? 'FR' : 'EN'}
          </span>
        </button>
      </form>
    )
  }
}
LanguageSwitcher.propTypes = {
  ...contextPropTypes,
}

const LanguageSwitcherContext = withContext(LanguageSwitcher)

export {
  LanguageSwitcherContext as default,
  LanguageSwitcher as LanguageSwitcherBase,
}
