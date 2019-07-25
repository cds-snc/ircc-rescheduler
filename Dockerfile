FROM node:10 as builder
WORKDIR /web

ARG PAPER_FILE_NUMBER_PATTERN
ARG RAZZLE_FLAGS
ARG RAZZLE_GA_ID
ENV RAZZLE_PAPER_FILE_NUMBER_PATTERN ${PAPER_FILE_NUMBER_PATTERN}
ENV RAZZLE_FLAGS ${RAZZLE_FLAGS}
ENV RAZZLE_GA_ID ${RAZZLE_GA_ID}

ADD ./ /web


EXPOSE 3004
EXPOSE 3005

RUN yarn install
RUN yarn build
RUN chmod -R 0755 /web

USER node
CMD [ "node", "src/server.js" ]
# # New stage
# FROM nginx:1.15-alpine
# # Get artifact
# COPY --from=builder /web /usr/share/nginx/html/
# # Login as node user
# ENV CHROME_BIN /usr/bin/chromium-browser
# EXPOSE 3004
# EXPOSE 3005


