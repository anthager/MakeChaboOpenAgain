#!/usr/bin/env bash
set -e

docker volume create certs
docker volume create www
docker run --rm --entrypoint /populate-www.sh -v www:/www antonhager/populate-www-volume