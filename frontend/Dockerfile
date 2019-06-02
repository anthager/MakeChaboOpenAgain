FROM node:10 as builder
RUN mkdir /usr/app
WORKDIR /usr/app
COPY base/package.json base/yarn.lock /usr/app/
RUN yarn
COPY frontend /usr/app
RUN yarn build

FROM nginx:1.15-alpine
COPY server/nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY server/nginx-conf/sites-enabled /etc/nginx/sites-enabled
RUN mkdir var/www/html
COPY --from=builder /usr/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
