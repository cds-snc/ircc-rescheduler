FROM keymetrics/pm2:latest-alpine
MAINTAINER Dave Samojlenko <dave.samojlenko@cds-snc.ca>

RUN apk update && apk add nginx
RUN mkdir -p /run/nginx

COPY ./docker/config/nginx.conf /etc/nginx/conf.d/vhost.conf

# ADD . /app
# WORKDIR /app

# EXPOSE 3000

# CMD [ "pm2-runtime", "start", "/app/ecosystem.config.json" ]
# CMD ["nginx", "-g", "daemon off;"]