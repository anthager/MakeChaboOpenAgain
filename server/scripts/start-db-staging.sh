#!/usr/bin/env bash
set -e

docker run \
-p 5432:5432 \
--env-file=/var/.envs/.db_staging.env \
--name mcoa_db_staging \
--restart always \
-v pgdata:/var/lib/postgresql/data \
--network swag \
-d \
postgres:10.5