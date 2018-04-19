# IRCC API

This microservice is responsible for accepting form data related to language
test rescheduling and notifying IRCC. That notification is currently simply an
email.

## Running the code

This project expects two environmental variables to be defined, and can be run
with the following command:

```sh
SENDGRID_API_KEY=abcd IRCC_RECEIVING_ADDRESS=ircc@example.com yarn start
```

When running, it listens on port 3001 and currently only supports a single
GraphQL query, which can be made this:

```graphql
mutation {
  decline(uci: "111", reason: "because reasons") {
    statusCode
  }
}
```

## Running the tests

```sh
> yarn test
```
