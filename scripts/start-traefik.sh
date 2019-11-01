#!/usr/bin/env bash
set -e

docker run -d \
	-p 80:80 \
	-p 443:443 \
	-p 8080:8080 \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v /var/traefik.yml:/etc/traefik/traefik.yml \
	-v /var/acme.json:/acme.json \
	--name traefik \
	--restart always \
	traefik

docker network connect mcoa_staging traefik
docker network connect mcoa_production traefik
