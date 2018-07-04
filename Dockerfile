FROM keymetrics/pm2:latest-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

RUN apk update && apk add nginx
RUN mkdir -p /run/nginx

COPY ./docker/config/nginx.conf /etc/nginx/conf.d/default.conf

ADD . /app
WORKDIR /app

EXPOSE 80

CMD [ "sh", "-c", "nginx && pm2-runtime start ecosystem.config.js"]