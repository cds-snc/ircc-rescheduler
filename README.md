# Reschedule a Citizenship Test service overview 🙅🗓

This is a service that allows users to reschedule their language tests during the citizenship process. This service was designed and developed by the [Canadian Digital Service](https://digital.canada.ca/), and is now owned and maintained by [Immigration, Refugees, and Citizenship Canada (IRCC)](https://www.canada.ca/en/immigration-refugees-citizenship.html).

Part of the process of applying for citizenship is that you have to attend an in-person appointment to assess your language skills. Previously, you would receive notification of this appointment by letter in the mail. If you couldn't make that appointment, due to travel or work commitments for example, you would have to write a letter back to IRCC to ask for a reschedule.

We redesigned the letter to make it clearer and simpler to understand, and it is now sent by email for those who have internet access. If you need to reschedule, you click a link in the email which brings you to this rescheduling service. It allows future citizens to rearrange their interview for a time that meets their needs, with minimal staff intervention.


## Table of contents

* [Technical overview 💻](#technical-overview-)
  * [Use of third-party services 📮](#use-of-third-party-services-)
  * [Automated tests 👩‍🔬](#automated-tests-)
* [Setup ⚙️](#setup-)
* [Startup 🚀](#startup-)
* [Running the tests 🏃‍](#running-the-tests-)
* [Additional documentation 📝](#additional-documentation-)
  * [Location setup 🌎](#location-setup-)
  * [Translations 🇨🇦](#translations-)
  * [Feature flags 🏁](#feature-flags-)
  * [Error tracking procedures 🚫](#error-tracking-procedures-)
  * [Upgrading package dependencies 📦](#upgrading-package-dependencies-)


## Technical overview 💻

The Rescheduler is a full-stack JavaScript application that uses [React](https://reactjs.org/) to build the frontend and the [After.js](https://github.com/jaredpalmer/after.js) framework for the app scaffolding. After.js integrates [React Router](https://reacttraining.com/react-router/) for its routing logic and uses [Razzle](https://github.com/jaredpalmer/razzle) to return server-rendered HTML to the browser. Additionally, we are using [React Context](https://reactjs.org/docs/context.html) as our app-wide data store from which we can hydrate our components.

Since we return server-rendered HTML and we have access to user data on the server, the Rescheduler works with or without client-side JavaScript, [serving users across the widest range of devices](https://digital.canada.ca/2018/08/08/supporting-users-gracefully-degrading-react/).

The Rescheduler aims to make rescheduling an appointment as simple as possible. The technical implications of this are that we capture only the smallest amount of data we need to and we have minimal external dependencies.
- User data is stored in browser cookies [which expire after a day](https://github.com/cds-snc/ircc-rescheduler/blob/master/src/cookies.js#L2)
- There is no external database
- Our one external API call is to [Amazon's Simple Email Service (SES)](https://aws.amazon.com/ses/) (via [Nodemailer](https://github.com/cds-snc/ircc-rescheduler/blob/c4e7d56ac183fb9b555e047a4ef82fff0c1b866b/src/email/sendmail.js#L35-L37)) to send confirmation of requests to users and local immigration offices

### Use of third-party services 📮

We use several third-party services for easier development as well as tracking our application out in the wild.

- [CircleCI](https://circleci.com/) runs automated tests on new pull requests and deploys new containers to the staging environment when new code is merged to the master branch
- [Heroku](https://www.heroku.com/) watches our repository and builds an app for each pull request so that team members can easily verify correct behaviour of proposed changes (this feature is called [Heroku Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps))
- [Snyk](https://snyk.io/) scans our [package.json](https://github.com/cds-snc/ircc-rescheduler/blob/master/package.json) file for packages with known vulnerabilities
- [Webpack Bundle Analyzer](`webpack-bundle-analyzer`) is used to introspect our compiled JavaScript bundle and see the relative size of each of our dependencies—this can be run with `yarn stats`
- [Sentry](https://sentry.io/for/react/) is used to capture JavaScript runtime exceptions in all environments (locally, on staging, and in production)
  - Additionally, [when our container starts up](https://github.com/cds-snc/ircc-rescheduler/blob/master/entrypoint.sh#L4), the source files from the build (ie, the compiled bundle files) [are uploaded to Sentry](https://github.com/cds-snc/ircc-rescheduler/blob/master/package.json#L28) and tagged as the latest release ([docs here](https://docs.sentry.io/clients/javascript/sourcemaps/)). Errors caught in each environment are sent back to Sentry with information about the release they came from, and—because we have uploaded our sourcemaps—Sentry is often able to identify the root of the error for easier debugging.
- [Google Analytics](https://marketingplatform.google.com/about/analytics/) logs data on pageviews and user behaviour in our production service

### Automated tests 👩‍🔬

All new pull requests on GitHub have a suite of tests run against them.

- [Pa11y](http://pa11y.org/): These build the app, loads a set of pages, and runs an accessibility audit on each page
- [Jest](https://jestjs.io/): Unit tests to verify correct internal logic for components
- [Puppeteer](https://pptr.dev/): End-to-end tests using headless Chrome with JS disabled that build the app and then run from beginning to the end without client-side JavaScript
- [ESLint](https://eslint.org/): JavaScript linter that ensures uniform JS throughout the app
- [lingui compile --strict](https://lingui.js.org/ref/cli.html#cmdoption-compile-strict): I18n library: fails the build if any English copy changes are missing French translations
- [Cypress](https://www.cypress.io/): End-to-end behaviour-driven tests that build the app and then run through desired user flows


## Setup ⚙️

There’s a bunch of environment variables you’ll need to get our super cool app up and running. [Razzle](https://github.com/jaredpalmer/razzle) accepts a bunch of pre-defined environment variables. It also accepts user-defined variables so long as they are prefixed with `RAZZLE_`.

[The Razzle docs](https://github.com/jaredpalmer/razzle#environment-variables) are pretty good on this stuff if you’re curious.

#### 1. `.env`

These options are set in all environments (except during tests).

- `PORT`: Defaults to `3000`, but we tend to prefer `3004`. This is part of Razzle’s configuration options.

- `VERBOSE`: Setting this to true will not clear the console when you make edits in development (useful for debugging). Also part of Razzle’s configuration options.

- `RAZZLE_PAPER_FILE_NUMBER_PATTERN`: Regular expression used to validate Paper file numbers. We don’t want the format widely known in case rescheduling your citizenship appointment goes viral.

- `RAZZLE_AWS_ACCESS_KEY_ID`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_AWS_REGION`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_AWS_SECRET_ACCESS_KEY`: Config option for [Amazon SES](https://aws.amazon.com/ses/). Required on startup.

- `RAZZLE_IRCC_TEST_RECEIVING_ADDRESS`: Local and Staging requests will be sent to this email address. For testing put your own email address when running the app locally. In production, the app will use the `receivingEmail` in the location file.

- `RAZZLE_SENDING_ADDRESS`: Requests will be marked as sent from this email address. Must be [verified by SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html). Required on startup.

- `RAZZLE_SITE_URL`: URL to be used for things such as redirects.

- `RAZZLE_STAGE`: Used to introspect where the app is running. One of `production`, `staging`, `local`, or `ci`.

- `RAZZLE_FLAGS`: Used for feature flags to decide whether to show or hide different interface elements. This is an optional flag: if it is missing, anything hidden behind a `FeatureFlag` will not be shown.

##### sample `.env` file

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
RAZZLE_FLAGS="[{"name":"newFeature","isActive":true},{"name":"evenNewerFeature","isActive":false}]"
```

#### 2. `.env.local`

These options are set locally, whether running in development (`yarn dev`) or production (`yarn start`) modes. They are never deployed to the server.

- `RAZZLE_IS_HTTP`: Secure cookies will only served over `https` connections. Similarly, when we do redirects on the server and we need the full domain string, we need to know if we're on `https` or `http`. Since we develop locally on `http`, but run our production site on `https`, we need this variable set to `true` so that we can save data between pages and redirect to the right address.

##### sample `.env.local` file

```
RAZZLE_IS_HTTP=true
```

#### 3. `.env.production`

These options are set when running in production mode (`yarn start`), whether locally or on the server.

- `RAZZLE_GA_ID`: Our Google Analytics ID code. If left unset, the app won’t send pageviews to Google. Not generally needed during local development but can be turned on to test functionality.

- `SENTRY_AUTH_TOKEN`: In order to upload our sourcemaps to sentry, we have to set an auth token. We upload source maps as part of deploys so that we can trace errors back to specific versions. This is not used once the app is running, so it doesn't use the `RAZZLE_` prefix.

##### sample `.env.production` file

```
RAZZLE_GA_ID='UA-111111111-1'
SENTRY_AUTH_TOKEN='notARealAuthToken'
```


## Startup 🚀

#### Install dependencies

- `yarn`

*Note: to install only the production dependencies, you can run `yarn install --production`*

#### Running in dev mode

Running in development mode is preferable for local development. The app takes less time to build and it will hot-reload with CSS/JS updates.

- `yarn dev`

#### Running in prod mode

This is what is run on the server once deployed, so testing against this version in different browsers is recommended.

- `yarn build`
- `yarn start`

Yes! Now shoot over to [localhost:3004](http://localhost:3004) and try to contain your excitement.

## Running the tests 🏃

We have a whole whack of tests, so buckle up.

- `yarn lint`: runs [ESLint](https://eslint.org/) on our JS files. ESLint config is kept in [`.eslintrc.js`](https://github.com/cds-snc/ircc-rescheduler/blob/master/.eslintrc.js)
- `yarn test`: uses [Jest](https://jestjs.io/) to run component-level unit tests
- `yarn test:full`: uses [Jest](https://jestjs.io/) and Puppeteer: runs component-level unit tests as well as end-to-end tests in headless Chrome with JS disabled
- `yarn a11y:test`: uses [Pa11y](http://pa11y.org/) to run an accessibility audit against a specified set of pages
- `yarn ci:dev`: uses [Cypress](https://www.cypress.io/) to run behaviour-driven end-to-end tests in a browser that it opens on the desktop
- `yarn ci:prod`: uses [Cypress](https://www.cypress.io/) to run behaviour-driven end-to-end tests in a headless browser that just spits out results to the command line

#### Almost tests

- `yarn extract && yarn compile --strict`: uses [Lingui](https://lingui.js.org/tutorials/react.html) to extract and compile all of the current content—not exactly a test but we are running this on CI because we want to fail if any French translations are missing
- `yarn stats`: uses [Webpack Bundle Analyzer](`webpack-bundle-analyzer`) to introspect our compiled JavaScript bundle and see the relative size of each of our dependencies

*Note: the tests we run on CI are [documented above](#automated-tests-).*


## Additional documentation 📝

### [Location setup 🌎](https://github.com/cds-snc/ircc-rescheduler/blob/master/docs/location-setup.md)
Documentation on how to add new locations or modify dates or contact information for existing locations.

### [Translations 🇨🇦](https://github.com/cds-snc/ircc-rescheduler/blob/master/docs/translations.md)
Documentation on how to add new locations or modify configuration for existing locations (for example, available dates or contact information).

### [Feature flags 🏁](https://github.com/cds-snc/ircc-rescheduler/blob/master/docs/feature-flags.md)
Feature flags can be used to when merging new code into master before it is completed and ready for release to production. New features can be made visible in some environments (ie, local or staging) but hidden in others (ie, production).

### [Error tracking procedures 🚫](https://github.com/cds-snc/ircc-rescheduler/blob/master/docs/error-tracking.md)
Outlines the procedures we follow for resolving captured errors. Also describes some of the metadata we capture and send to Sentry.

### [Upgrading package dependencies 📦](https://github.com/cds-snc/ircc-rescheduler/blob/master/docs/upgrade.md)
Outlines the procedures we follow for upgrading packages, which we were doing once per (two-week) sprint. Also outlines the process we followed for tracking down vulnerabilities.
