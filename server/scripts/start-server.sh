#!/usr/bin/env bash
set -e

docker run \
-p 80:80 \
-p 443:443 \
-v "certs:/certs" \
-v "www:/var/www" \
--restart=always \
antonhager/main_server:0.2.0