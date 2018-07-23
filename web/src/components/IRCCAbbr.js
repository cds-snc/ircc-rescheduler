import React from 'react'
import { withI18n } from 'lingui-react'
import { css } from 'react-emotion'
import { mediaQuery } from '../styles'

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

const IRCCAbbr = withI18n()(({ i18n }) => (
  <span className={abbreviation}>
    <abbr title={i18n._('Immigration, Refugees and Citizenship Canada')}>
      IRCC
    </abbr>
  </span>
))

export default IRCCAbbr
