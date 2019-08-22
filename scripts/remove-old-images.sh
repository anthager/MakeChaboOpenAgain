#!/usr/bin/env bash
set -e
images_to_remove=$(comm -23 <(docker images | awk '{print $1":"$2}' | grep "antonhager" | sort) <(docker ps | awk '{print $2}' | tail -n +2 | sort))

for image in $images_to_remove; do
	docker rmi $image
done
