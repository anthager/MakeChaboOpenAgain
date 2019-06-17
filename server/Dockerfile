FROM nginx:1.15-alpine
COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY nginx-conf/sites-enabled /etc/nginx/sites-enabled
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
