#!/bin/bash
set -euo pipefail

set +e
helm_exec=$(which helm)
set -e

if [ -z ${helm_exec} ]; then
  echo "Helm must be installed. You can install it from https://helm.sh/docs/intro/install/"
  exit 1
fi

helm repo add bitnami https://charts.bitnami.com/bitnami