FROM node:alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ARG PAPER_FILE_NUMBER_PATTERN
ENV RAZZLE_PAPER_FILE_NUMBER_PATTERN ${PAPER_FILE_NUMBER_PATTERN}

ADD ./web /web
RUN echo $CIRCLE_SHA1 | cut -c -7 > /web/VERSION

WORKDIR /web

EXPOSE 3004

RUN yarn install --production
RUN yarn compile
RUN yarn build

USER node

CMD [ "yarn", "start" ]
