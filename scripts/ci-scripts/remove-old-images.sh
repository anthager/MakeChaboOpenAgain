#!/usr/bin/env bash
set -e
DOCKER_USERNAME=antonhager
images_to_remove=$(comm -23 <(docker images | awk '{print $1":"$2}' | grep "DOCKER_USERNAME" | sort) <(docker ps | awk '{print $2}' | tail -n +2 | sort))

for image in $images_to_remove; do
	docker rmi -f $image
done
