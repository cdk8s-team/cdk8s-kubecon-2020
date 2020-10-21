import { App, Chart, ChartOptions } from 'cdk8s';
import { EnvValue } from 'cdk8s-plus';
import { Construct } from 'constructs';
import { Router } from '../router';
import { Redis } from './redis';

class MyChart extends Chart {
  constructor(scope: Construct, id: string, opts: ChartOptions = {}) {
    super(scope, id, opts);

    const redis = new Redis(this, 'tasks');
    const router = new Router(this, 'router');

    router.addBackend('/hello', `${__dirname}/hello`);

    router.addBackend('/counter', `${__dirname}/counter`, {
      replicas: 3,
      env: {
        REDIS_PASSWORD: EnvValue.fromSecretValue(redis.password),
        REDIS_MASTER: EnvValue.fromValue(redis.masterHost),
        REDIS_SLAVE: EnvValue.fromValue(redis.slaveHost),
      },
    });

    router.addBackend('/redis', `${__dirname}/redis-ui`, {
      registry: 'localhost:5000',
      readinessUrl: '/redis',
      port: 8081,
      env: {
        REDIS_HOST: EnvValue.fromValue(redis.masterHost),
        REDIS_PASSWORD: EnvValue.fromSecretValue(redis.password),
        URL_PREFIX: EnvValue.fromValue('/redis'),
      },
    });
  }
}

const app = new App();
new MyChart(app, 'test', {
  labels: { prune: 'kubecon-demo' },
});
app.synth();