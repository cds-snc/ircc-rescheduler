import React from 'react'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import { Helmet } from 'react-helmet'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import {
  theme,
  visuallyhidden,
  visuallyhiddenMobile,
  mediaQuery,
  focusRing,
} from '../styles'

const button = css`
  ${focusRing};
  display: inline-block;
  font-size: ${theme.font.base};
  color: ${theme.colour.white};
  font-family: ${theme.weight.r}, Helvetica, Arial, sans-serif;
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
    let { context: { setStore } = {} } = this.props

    return (
      <form>
        <Helmet>
          <html lang={this.state.language} />
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
          onClick={e => {
            e.preventDefault()
            this.setState({ language: this.getNewLanguage() }, () =>
              setStore('language', this.state.language),
            )
          }}
        >
          {this.getNewLanguage() === 'fr' ? (
            <span>
              <span className={visuallyhiddenMobile}>Français</span>
              <span className={hiddenOnDesktop} aria-hidden="true">
                FR
              </span>
            </span>
          ) : (
            'English'
          )}
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
