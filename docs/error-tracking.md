# Error tracking procedures

1. Error is reported to Sentry - https://sentry.io

- When looking at an issue we will determine which category / level the issues falls into:

a. Critical -> outcome  -> needs hotfix ASAP
b. Low priority -> outcome -> consider adding to inbox to build into a sprint
c. Monitor further -> outcome (comment + wait for re-occurrence)

2. Once we've committed to fixing the error will need to be re-created either locally or via BrowserStack.

3. Fix or determine that further actions for the issue.

*  Fix and write a test where possible to prevent the issue from recurring

## Error metadata

Errors captured by sentry [will always contain metadata](https://github.com/cds-snc/ircc-rescheduler/pull/468) to help identify where the error came from and therefore how serious it is.

All exceptions and messages captured will have the following useful context:

- included under `tags`
  - **The URL host**: tells us what base URL the error came from
  - **The subdomain**: tells us what 'location' the user was trying to access
  - **The URL path**: tells us what URL path the user was trying to access
  - **The RAZZLE_STAGE env var**: tells us in which environment this error occurred
- included under `extra`:
  - **The 'release' string**: formatted {RAZZLE_STAGE}-{COMMIT_HASH}, this tells us what version of the code was deployed when the error occurred
