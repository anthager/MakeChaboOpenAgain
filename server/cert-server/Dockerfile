FROM nginx:1.15-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
