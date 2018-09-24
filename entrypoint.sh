#!/bin/sh

COMMIT_HASH=`cat /web/VERSION`
SENTRY_RELEASE=$RAZZLE_STAGE-$COMMIT_HASH

yarn sentry_map
yarn start