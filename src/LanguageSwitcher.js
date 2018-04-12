import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const GET_LANGUAGE_QUERY = gql`
  query GetLanguage {
    language @client
  }
`
const CHANGE_LANGUAGE_MUTATION = gql`
  mutation switchLanguage {
    switchLanguage @client
  }
`
export const LanguageSwitcher = () => (
  <Query query={GET_LANGUAGE_QUERY}>
    {({ data: { language } }) => (
      <Mutation mutation={CHANGE_LANGUAGE_MUTATION}>
        {switchLanguage => (
          <div>
            <a
              onClick={() => {
                switchLanguage({ variables: { language: 'fr' } })
              }}
            >
						{language === 'en' ? 'French' : 'English'}
            </a>
          </div>
        )}
      </Mutation>
    )}
  </Query>
)

