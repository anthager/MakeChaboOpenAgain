#!/usr/bin/env bash
set -e

docker run \
-p 8000:80 \
-v "certs:/certs" \
-v "www:/var/www" \
antonhager/main_server