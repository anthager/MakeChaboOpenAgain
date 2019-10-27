#!/usr/bin/env bash
set -ex
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
STAGE=$1
DOCKER_USERNAME=$2
SHA=$3

if [[ $(docker ps -a | grep "mcoa_frontend_${STAGE}") ]]; then
	docker rm -f mcoa_frontend_${STAGE}
fi

docker run -d \
	--name mcoa_frontend_${STAGE} \
	--network mcoa_${STAGE} \
	--env-file /var/envs/$STAGE.env \
	--label "traefik.enable=true" \
	--label "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https" \
	--label "traefik.http.routers.mcoa_${STAGE}-http.entrypoints=web" \
	--label "traefik.http.routers.mcoa_${STAGE}-http.rule=Host(\`staging.open.anton.pizza\`)" \
	--label "traefik.http.routers.mcoa_${STAGE}-http.middlewares=https-redirect" \
	--label "traefik.http.routers.mcoa_${STAGE}.entrypoints=web-secure" \
	--label "traefik.http.routers.mcoa_${STAGE}.rule=Host(\`staging.open.anton.pizza\`)" \
	--label "traefik.http.routers.mcoa_${STAGE}.tls=true" \
	--label "traefik.http.routers.mcoa_${STAGE}.tls.certresolver=anton-pizza" \
	$DOCKER_USERNAME/mcoa_frontend:$SHA
