#!/bin/bash
set -e
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

docker run --rm -it \
-v "/home/antonhagermalm/certbot/letsencrypt:/etc/letsencrypt" \
-v "/home/antonhagermalm/certbot/www/:/var/www/html/shared" \
-v "/home/antonhagermalm/certbot/debug-log:/var/log/letsencrypt" \
certbot/certbot certonly \
--webroot \
--webroot-path /var/www \
--email hej@anton.pizza \
-d "tst.anton.pizza"
