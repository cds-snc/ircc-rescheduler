FROM node:alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ARG PAPER_FILE_NUMBER_PATTERN
ENV RAZZLE_PAPER_FILE_NUMBER_PATTERN ${PAPER_FILE_NUMBER_PATTERN}

ADD ./web /web

WORKDIR /web

EXPOSE 3004

RUN yarn install --production
RUN yarn build

USER node

CMD [ "yarn", "start" ]
