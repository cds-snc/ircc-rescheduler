import React from 'react'
import withContext from '../withContext'
import { withI18n } from 'lingui-react'
import { css } from 'react-emotion'
import { mediaQuery } from '../styles'
import PropTypes from 'prop-types'

const abbreviation = css`
  abbr[title] {
    text-decoration: none;
    border-bottom: 2.5px dotted #999;
    cursor: help;
  }

  ${mediaQuery.sm(css`
    abbr[title]:after {
      content: ' (' attr(title) ')';
      font-size: 0.85em;
    }
  `)};
`

const Abbreviation = ({ context = {} }) => (
  <span className={abbreviation}>
    <abbr
      title={
        context.store &&
        context.store.language &&
        context.store.language === 'en'
          ? 'Immigration, Refugees and Citizenship Canada'
          : 'Immigration, Réfugiés et Citoyenneté Canada'
      }
    >
      IRCC
    </abbr>
  </span>
)

Abbreviation.propTypes = {
  context: PropTypes.shape({
    store: PropTypes.object,
    setStore: PropTypes.func,
  }),
}

const AbbreviationContext = withContext(withI18n()(Abbreviation))

export { AbbreviationContext as default }
