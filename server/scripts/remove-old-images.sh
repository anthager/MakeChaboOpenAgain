#!/usr/bin/env bash
set -e
comm -23 <(docker images | awk '{print $1":"$2}' | grep "antonhager" | sort) <(docker ps | awk '{print $2}' | tail -n +2 | sort) | xargs docker rmi