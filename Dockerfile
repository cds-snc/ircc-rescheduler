FROM node:alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ADD ./web /web
COPY ./.env.build /web/.env

WORKDIR /web

EXPOSE 3004

RUN yarn
RUN yarn compile
RUN yarn build

USER node

CMD [ "yarn", "start" ]