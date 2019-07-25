FROM cypress/base:10
WORKDIR /app

COPY package.json .
COPY package-lock.json .
# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
ENV CI=1
RUN npm i

# verify that cypress has been installed correctly
RUN npx cypress verify

COPY cypress ./cypress/integration
COPY cypress.json ./