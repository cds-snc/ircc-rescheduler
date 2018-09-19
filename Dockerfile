FROM node:alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

ARG PAPER_FILE_NUMBER_PATTERN
ENV RAZZLE_PAPER_FILE_NUMBER_PATTERN ${PAPER_FILE_NUMBER_PATTERN}

RUN git rev-parse --short HEAD > web/VERSION
ADD ./web /web

WORKDIR /web

EXPOSE 3004

RUN yarn install --production
RUN yarn compile
RUN yarn build

USER node

CMD [ "yarn", "start" ]
