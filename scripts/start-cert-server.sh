#!/usr/bin/env bash
set -e

docker run \
	-p 80:80 \
	-v "certs:/certs" \
	-v "www:/var/www" \
	--name cert_server \
	antonhager/cert_server:1.0.0
