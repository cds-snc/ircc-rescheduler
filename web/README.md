# IRCC Rescheduler

This service captures the information needed to reschedule a citizenship appointment in Vancouver and sends it to the local IRCC office.

## Setup

There’s a bunch of environment variables you’ll need to get our super cool app up and running. Razzle accepts a bunch of pre-defined environment variables. It also accepts user-defined variables so long as they are prefixed with `RAZZLE_`.

[The Razzle docs](https://github.com/jaredpalmer/razzle#environment-variables) are pretty good on this stuff if you’re curious.

#### 1. `web/.env`

These options are set in all environments (except during tests).

- `PORT`: Defaults to `3000`, but we tend to prefer `3004`. This is part of Razzle’s configuration options.

- `VERBOSE`: Setting this to true will not clear the console when you make edits in development (useful for debugging). Also part of Razzle’s configuration options.

- `RAZZLE_PAPER_FILE_NUMBER_PATTERN`: Regular expression used to validate Paper file numbers. We don’t want the format widely known in case rescheduling your citizenship appointment goes viral.

- `RAZZLE_AWS_ACCESS_KEY_ID`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_AWS_REGION`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_AWS_SECRET_ACCESS_KEY`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_IRCC_RECEIVING_ADDRESS`: Requests will be sent to this email address. In production, this will be the IRCC office, but it probably makes more sense to put your own email address when running the app locally. Required on startup.

- `RAZZLE_SENDING_ADDRESS`: Requests will be marked as sent from this email address. Must be [verified by SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html). Required on startup.

- `RAZZLE_SITE_URL`: Used by [`inline-css`](https://www.npmjs.com/package/inline-css) to generate links in emails. Leaving this blank (`' '`) is recommended. Required on startup.

##### sample `web/.env` file

```
PORT=3004
VERBOSE=true
RAZZLE_PAPER_FILE_NUMBER_PATTERN=[a-zA-Z]{1}
RAZZLE_AWS_ACCESS_KEY_ID=SOME_ACCESS_ID
RAZZLE_AWS_REGION=some-region-1
RAZZLE_AWS_SECRET_ACCESS_KEY=someAccessKey
RAZZLE_IRCC_RECEIVING_ADDRESS=your.name@example.com
RAZZLE_SENDING_ADDRESS=justin@canada.ca
RAZZLE_SITE_URL=' '
```

#### 2. `web/.env.local`

These options are set locally, whether running in development (`yarn dev`) or production (`yarn start`) modes. They are never deployed to the server.

- `RAZZLE_COOKIE_HTTP`: Secure cookies will only served over `https` connections. Since we develop locally on `http`, we need this variable set to `true` so that we can save data between pages.

##### sample `web/.env.local` file

```
RAZZLE_COOKIE_HTTP=true
```

#### 3. `web/.env.production`

These options are set when running in production mode (`yarn start`), whether locally or on the server.

- `RAZZLE_COOKIE_SECRET`: A secret used to encrypt user data. Must be 32 characters long. If left unset, a default secret will be used (ie, for local development).

- `RAZZLE_GA_ID`: Our Google Analytics ID code. If left unset, the app won’t send pageviews to Google. Not generally needed during local development but can be turned on to test functionality.


##### sample `web/.env.production` file

```
RAZZLE_COOKIE_SECRET='DONE_KEPT_IT_REAL_FROM_THE_JUMP_'
RAZZLE_GA_ID='UA-111111111-1'
```

## How to use

#### install dependencies

- `yarn`


#### running in dev mode

Running in development mode is preferable for local development. The app takes less time to build and it will hot-reload with CSS/JS updates.

- `yarn dev`

#### running in prod mode

This is what is run on the server once deployed, so testing against this version in different browsers is recommended.

- `yarn build`
- `yarn start`

Yes! Now shoot over to [localhost:3004](http://localhost:3004) and try to contain your excitement.

## Running the tests

```bash
yarn test # runs unit tests
yarn lint # lints codebase
```
