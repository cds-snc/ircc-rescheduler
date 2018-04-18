FROM mhart/alpine-node:8
MAINTAINER Mike Williamson <mike.williamson@cds-snc.ca>
RUN addgroup -g 1000 -S irccapp && \
          adduser -u 1000 -S irccapp -G irccapp
ENV RAZZLE_PUBLIC_DIR /app/build/public
ADD . /app
WORKDIR /app
RUN yarn install --production=false
RUN yarn compile
RUN yarn build
EXPOSE 3004
USER irccapp
CMD yarn start
