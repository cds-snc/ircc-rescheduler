import gql from 'graphql-tag'

export const GET_LANGUAGE_QUERY = gql`
  query GetLanguage {
    language @client
  }
`
export const CHANGE_LANGUAGE_MUTATION = gql`
  mutation switchLanguage {
    switchLanguage @client
  }
`
export const GET_USER_DATA = gql`
  query getUserData {
    userRegistrationData @client {
      fullName
      paperFileNumber
      reason
      explanation
    }
    selectedDays @client
  }
`
