#!/bin/bash
yarn install --pure-lockfile --production
yarn build
yarn start