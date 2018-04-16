import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { GET_LANGUAGE_QUERY, CHANGE_LANGUAGE_MUTATION } from './queries'
import styled from 'react-emotion'

const A = styled('a')`
  text-decoration: underline;
  &:visited {
    color: #7834bc;
  }
  &:hover {
    cursor: pointer;
  }
`

export const LanguageSwitcher = () => (
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
)
