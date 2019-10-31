#!/usr/bin/env bash
set -e
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

docker run -d \
	-p 80:80 \
	-p 443:443 \
	-p 8080:8080 \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v /var/traefik.yml:/etc/traefik/traefik.yml \
	-v /var/acme.json:/acme.json \
	--name traefik \
	--restart always \
	--network mcoa_staging \
	--network mcoa_production \
	traefik
