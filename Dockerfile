FROM node:8.9.1 AS build-env
MAINTAINER Mike Williamson <mike.williamson@cds-snc.ca>
ADD . /app
WORKDIR /app
ENV NODE_ENV production
RUN yarn build

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
ENV NODE_ENV production
WORKDIR /app
CMD ["build/server.js"]
