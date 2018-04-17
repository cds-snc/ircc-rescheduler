import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_LANGUAGE_QUERY, CHANGE_LANGUAGE_MUTATION } from './queries'
import styled, { css } from 'react-emotion'
import { Trans } from 'lingui-react'

const A = styled('a')`
  text-decoration: underline;
  &:visited {
    color: #7834bc;
  }
  &:hover {
    cursor: pointer;
  }
`

const langHeader = css`
  clip: rect(1px,1px,1px,1px);
  height: 1px;
  width: 1px;
  margin: 0;
  overflow: hidden;
  position: absolute;
`

export const LanguageSwitcher = () => (
  <section>
    <h2 className={langHeader}><Trans>Language Selection</Trans></h2>
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
