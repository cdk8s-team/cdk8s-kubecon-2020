# Demo Script

## SETUP

```shell
./kind-setup.sh
```

## Intro

1. projen new typescript-app
2. add deps: `cdk8s`, `cdk8s-plus`, `constructs`
3. `main.ts` - talk about construct tree
4. empty chart, show output
5. pod with `alpine` echo "hello"
6. `deploy` script
7. prune

## Hello Endpoint

1. Invite Eli - "api router with docker based backends".
2. API design
3. `/hello` endpoint
   1. `Dockerfile`, `index.js` (+ SIGINT)
   2. Image (`cdk8s-image`)
   3. Service/Deployment
      1. Port-forward to test
   4. Ingress

## Productization

1. Add replicas, add `hostname()`, show load balancing
2. Downtime?
3. Add readiness probe

## Counter

1. Eli: "lets get real and implement a counter"
2. Redis, helm chart
3. Redis test deployment
4. Redis construct
5. Implement counter
6. Redis commander
