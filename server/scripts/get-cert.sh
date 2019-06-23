#!/bin/bash
set -e

docker run --rm -it \
-v "certs:/etc/letsencrypt" \
-v "www:/var/www" \
certbot/certbot certonly \
--webroot \
--webroot-path /var/www/certbot \
--email hej@anton.pizza \
-d "beta.open.anton.pizza"
-d "beta.api.open.anton.pizza"
-d "beta.staging.open.anton.pizza"
-d "beta.staging.api.anton.pizza"
