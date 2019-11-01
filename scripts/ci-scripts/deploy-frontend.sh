#!/usr/bin/env bash
set -ex
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
STAGE=$1
DOCKER_USERNAME=$2
SHA=$3

if [[ $(docker ps -a | grep "mcoa_frontend_${STAGE}") ]]; then
	docker rm -f mcoa_frontend_${STAGE}
fi

STAGE_URL=$([ $STAGE = "production" ] && echo "" || echo "${STAGE}.")

docker run -d \
	--name mcoa_frontend_${STAGE} \
	--network mcoa_${STAGE} \
	--restart always \
	--env-file /var/envs/$STAGE.env \
	--label "traefik.enable=true" \
	--label "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}-http.entrypoints=web" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}-http.rule=Host(\`${STAGE_URL}open.anton.pizza\`)" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}-http.middlewares=https-redirect" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}.entrypoints=web-secure" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}.rule=Host(\`${STAGE_URL}open.anton.pizza\`)" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}.tls=true" \
	--label "traefik.http.routers.mcoa_frontend_${STAGE}.tls.certresolver=anton-pizza" \
	$DOCKER_USERNAME/mcoa_frontend:$SHA
