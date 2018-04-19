import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_LANGUAGE_QUERY, CHANGE_LANGUAGE_MUTATION } from './queries'
import styled from 'react-emotion'
import { Trans } from 'lingui-react'
import { theme, visuallyhidden } from './styles'

const A = styled('a')`
  font-size: ${theme.font.base};
  text-decoration: underline;
  &:visited {
    color: #7834bc;
  }
  &:hover {
    cursor: pointer;
  }
`

export const LanguageSwitcher = () => (
  <section>
    <h2 className={visuallyhidden}>
      <Trans>Language Selection</Trans>
    </h2>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <Mutation mutation={CHANGE_LANGUAGE_MUTATION}>
          {switchLanguage => (
            <A onClick={() => switchLanguage()}>
              {language === 'en' ? 'Français' : 'English'}
            </A>
          )}
        </Mutation>
      )}
    </Query>
  </section>
)
