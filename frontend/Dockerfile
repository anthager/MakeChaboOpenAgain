FROM node:10 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY . /usr/src/app
RUN yarn build


FROM nginx:1.15-alpine
RUN rm -rf /etc/nginx/conf.d
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]