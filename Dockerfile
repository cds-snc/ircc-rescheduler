FROM mhart/alpine-node:8
MAINTAINER Mike Williamson <mike.williamson@cds-snc.ca>
ENV RAZZLE_PUBLIC_DIR /app/build/public
ADD . /app
WORKDIR /app
RUN yarn install --production=false
RUN yarn compile
RUN yarn build
EXPOSE 3004
CMD yarn start
