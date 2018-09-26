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

- `RAZZLE_IRCC_TEST_RECEIVING_ADDRESS`: Local and Staging requests will be sent to this email address. For testing put your own email address when running the app locally. In production, the app will use the recevingAddress in the location file.

- `RAZZLE_SENDING_ADDRESS`: Requests will be marked as sent from this email address. Must be [verified by SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html). Required on startup.

- `RAZZLE_SITE_URL`: URL to be used for things such as redirects.

- `RAZZLE_STAGE`: Used to introspect where the app is running. One of `production`, `staging`, or `development`.

##### sample `web/.env` file

```
PORT=3004
VERBOSE=true
RAZZLE_PAPER_FILE_NUMBER_PATTERN=[a-zA-Z]{1}
RAZZLE_AWS_ACCESS_KEY_ID=SOME_ACCESS_ID
RAZZLE_AWS_REGION=some-region-1
RAZZLE_AWS_SECRET_ACCESS_KEY=someAccessKey
RAZZLE_IRCC_TEST_RECEIVING_ADDRESS=your.name@example.com
RAZZLE_SENDING_ADDRESS=justin@canada.ca
RAZZLE_SITE_URL=rescheduler-dev.cds-snc.ca
RAZZLE_STAGE='development'
```

#### 2. `web/.env.local`

These options are set locally, whether running in development (`yarn dev`) or production (`yarn start`) modes. They are never deployed to the server.

- `RAZZLE_IS_HTTP`: Secure cookies will only served over `https` connections. Similarly, when we do redirects on the server and we need the full domain string, we need to know if we're on `https` or `http`. Since we develop locally on `http`, but run our production site on `https`, we need this variable set to `true` so that we can save data between pages and redirect to the right address.

##### sample `web/.env.local` file

```
RAZZLE_IS_HTTP=true
```

#### 3. `web/.env.production`

These options are set when running in production mode (`yarn start`), whether locally or on the server.

- `RAZZLE_GA_ID`: Our Google Analytics ID code. If left unset, the app won’t send pageviews to Google. Not generally needed during local development but can be turned on to test functionality.

- `SENTRY_AUTH_TOKEN`: In order to upload our sourcemaps to sentry, we have to set an auth token. We upload source maps as part of deploys so that we can trace errors back to specific versions. This is not used once the app is running, so it doesn't use the `RAZZLE_` prefix.

##### sample `web/.env.production` file

```
RAZZLE_GA_ID='UA-111111111-1'
SENTRY_AUTH_TOKEN='notARealAuthToken'
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

## Translations

Translations are managed by [jsLingui](https://lingui.js.org/tutorials/react.html)

```
import { Trans } from '@lingui/react'

const SomeComponent = () => {
    return <Trans>Your text</Trans>
}

```

To update the locale files use:

- `yarn extract` (creates new messages.json)
- make changes to locale/fr/messages.json

```
"Your text": {
    "translation": "",
    "origin": [
      [
        "src/components/SomeComponent.js",
        22
      ]
    ]
  },
```

- `yarn compile`


## Feature Flags

If your adding or modifying a feature it's possible to hide it behind a feature flag. 

The `FeatureFlag` component accepts `on` (a matching flag was found) and `off` (no match) properties.

Flags are setup via an envoroment variable which is an array of flags
```
RAZZLE_FLAGS=[{"name":"nextButton","isActive":true},{"name":"noDatesCheckbox", "isActive": true}]
```

**Example:**

Given `hasNewFeature` is set in our .env file the following would output `<SomeNewFeature />`

```
import { FeatureFlag } from '../components/FeatureFlag'

<MyComponent               
  submit={() => {
    return (
      <FeatureFlag
        flags={['hasNewFeature']}
        on={() => (
          <SomeNewFeature />
        )}
        off={() => (
          return null
        )}
      />
    )
  }}
/>
```