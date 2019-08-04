#!/usr/bin/env bash
set -e

docker run \
-p 80:80 \
-p 443:443 \
-v "certs:/certs" \
-v "$(pwd)/www:/var/www" \
--name main_server \
--restart=always \
--network swag \
antonhager/main_server:$TAG