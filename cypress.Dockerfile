FROM cypress/included:3.4.0
ADD ./ /web

WORKDIR /web
RUN mkdir -p ~/cypress
COPY package.json .
COPY yarn.lock .
# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
ENV CI=1
# RUN npm i

# verify that cypress has been installed correctly
RUN npx cypress verify

COPY cypress ./cypress
COPY cypress.json .