#!/usr/bin/env bash
set -e
if [[ -n $(docker ps | grep main_server) ]]; then
	docker kill main_server
	docker rm main_server
elif [[ -n $(docker ps -a | grep main_server) ]]; then
	docker rm main_server
fi

docker run \
	-p 80:80 \
	-p 443:443 \
	-v "certs:/certs" \
	-v "/var/www:/var/www" \
	--name main_server \
	--restart=always \
	--network swag \
	-d \
	antonhager/main_server:$1
