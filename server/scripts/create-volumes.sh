#!/usr/bin/env bash
set -e

docker volume create certs
mkdir -p /var/www/master
mkdir -p /var/www/staging
mkdir -p /var/www/certbot