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
   3. Ingress
   6. Backend
   4. Deployment
   5. expose() -> Service

[25:00]

## Productization

* Readiness Probe
* Replicas
* Redis, helm chart
* Redis construct

[40:00]

* Implement counter

[50:00]

* Redis commander

