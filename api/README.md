# IRCC API

This microservice is responsible for accepting form data related to language
test rescheduling and notifying IRCC. That notification is currently simply an
email.

## Running the code

This project expects two environmental variables to be defined, and can be run
with the following command:

```sh
SENDING_ADDRESS="from@example.com" IRCC_RECEIVING_ADDRESS="to@example.com" AWS_SECRET_ACCESS_KEY="secret" AWS_ACCESS_KEY_ID="id" AWS_REGION=xxxxxxxxx yarn start
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
