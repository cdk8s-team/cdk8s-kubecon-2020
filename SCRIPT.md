# Demo Script

## SETUP

```shell
./kind-setup.sh
```

## Intro

* Introduce Elad
* Invite Eli
* kind
* Project structure
* `main.ts` - talk about construct tree
* empty chart, show output
* ApiObject `v1/ConfigMap` with `data`
* Deployment with `alpine` echo "hello"
* `deploy` script
* prune

## Hello Endpoint

* Eli: "api router with docker based backends".
* API design
* `/counter` endpoint
   1. `Dockerfile`, `index.js` (+ SIGINT)
   2. Image (`cdk8s-image`)
   3. Ingress
   4. Deployment
   5. expose() -> Service
   6. Backend

## Productization

* Readiness Probe
* Replicas

## Redis

* Redis, helm chart
* Redis test deployment
* Redis construct
* Implement counter
* Redis commander
