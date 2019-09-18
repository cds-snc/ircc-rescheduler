#!/bin/sh
yarn install --pure-lockfile --production
echo $RAZZLE_CONNECTION_STRING
yarn build
yarn start