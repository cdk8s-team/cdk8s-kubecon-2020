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

[15:00]

## Counter Endpoint

* Eli: "api router with docker based backends".
* API design
* `/counter` endpoint
   1. `Dockerfile`, `index.js` (+ SIGINT)
   2. Image (`cdk8s-image`)
   3. Ingress
   4. Deployment
   5. expose() -> Service
   6. Backend

[25:00]

## Productization

* Readiness Probe
* Replicas

[30:00]

## Redis

* Redis, helm chart
* Redis test deployment

[40:00]

* Redis construct

[42:00]

* Implement counter

[50:00]

* Redis commander

