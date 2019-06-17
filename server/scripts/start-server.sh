#!/usr/bin/env bash
set -e
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"

docker run docker run \
-p 8000:80\
-v "/home/antonhagermalm/cert2/:/certs/anton.pizza/" \
antonhager/main_server:0.0.1