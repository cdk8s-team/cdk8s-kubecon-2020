import { App, Chart, ChartOptions, Helm } from 'cdk8s';
import * as kplus from 'cdk8s-plus';
import { Construct } from 'constructs';
import { Router } from '../../src';

class Redis extends Construct {
  public readonly password: kplus.SecretValue;
  public readonly masterHost: string;
  public readonly slaveHost: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const redis = new Helm(this, 'redis', {
      chart: 'bitnami/redis',
    });

    this.masterHost = `${redis.releaseName}-master`;
    this.slaveHost = `${redis.releaseName}-slave`;

    this.password = {
      secret: kplus.Secret.fromSecretName(redis.releaseName),
      key: 'redis-password',
    };
  }
}

class MyChart extends Chart {
  constructor(scope: Construct, id: string, opts: ChartOptions = {}) {
    super(scope, id, opts);

    const redis = new Redis(this, 'tasks');
    const router = new Router(this, 'router');

    router.addBackend('/counter', `${__dirname}/counter`, {
      replicas: 3,
      registry: 'localhost:5000',
      env: {
        REDIS_PASSWORD: kplus.EnvValue.fromSecretValue(redis.password),
        REDIS_MASTER: kplus.EnvValue.fromValue(redis.masterHost),
        REDIS_SLAVE: kplus.EnvValue.fromValue(redis.slaveHost),
      },
    });

    router.addBackend('/redis', `${__dirname}/redis`, {
      registry: 'localhost:5000',
      readinessUrl: '/redis',
      port: 8081,
      env: {
        REDIS_HOST: kplus.EnvValue.fromValue(redis.masterHost),
        REDIS_PASSWORD: kplus.EnvValue.fromSecretValue(redis.password),
        URL_PREFIX: kplus.EnvValue.fromValue('/redis'),
      },
    });
  }
}

const app = new App();
new MyChart(app, 'test');
app.synth();