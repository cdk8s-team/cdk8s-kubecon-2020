#!/bin/bash
set -euo pipefail

cd images/typescript
docker build -t localhost:5000/ekpress-typescript .
docker push localhost:5000/ekpress-typescript
