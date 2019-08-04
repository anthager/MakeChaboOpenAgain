#!/usr/bin/env bash
set -e

docker run \
-p 80:80 \
-p 443:443 \
-v "certs:/certs" \
-v "/var/www:/var/www" \
--name main_server \
--restart=always \
--network swag \
antonhager/mcoa_main_server:$TAG