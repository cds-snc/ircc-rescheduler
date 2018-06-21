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
      email
      paperFileNumber
      reason
      explanation
    }
    selectedDays @client
  }
`

export const SUBMIT = gql`
  mutation submit(
    $fullName: String!
    $email: String!
    $explanation: String!
    $reason: String!
    $paperFileNumber: String!
    $availability: [Date!]!
  ) {
    decline(
      input: {
        fullName: $fullName
        email: $email
        explanation: $explanation
        reason: $reason
        paperFileNumber: $paperFileNumber
        availability: $availability
      }
    ) {
      requestId
      messageId
    }
  }
`
