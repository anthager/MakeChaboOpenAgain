#!/bin/bash
set -e

docker run --rm -it \
-v "certs:/etc/letsencrypt" \
-v "www:/var/www" \
certbot/certbot certonly \
--webroot \
--webroot-path /var/www/certbot \
--email hej@anton.pizza \
-d "tst.anton.pizza"
