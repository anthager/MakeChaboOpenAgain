#!/usr/bin/env bash
set -e

docker volume create certs
mkdir -p /var/www/builds/master
mkdir -p /var/www/builds/staging
mkdir -p /var/www/certbot