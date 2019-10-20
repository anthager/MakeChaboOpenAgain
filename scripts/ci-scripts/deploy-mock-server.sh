#!/usr/bin/env bash
set -e
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

#!/usr/bin/env bash
set -e
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
STAGE=$1
DOCKER_USERNAME=$2
SHA=$(echo $3 | cut -c1-7)

if [[ $(docker ps -a | grep "mcoa_mock_server") ]]; then
	docker rm -f mcoa_mock_server
fi
docker run -d \
	--name mcoa_mock_server \
	--network swag \
	-e PORT=80 \
	$DOCKER_USERNAME/mcoa_mock_server:$SHA
