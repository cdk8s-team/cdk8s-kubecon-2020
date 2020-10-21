import { Helm } from 'cdk8s';
import { Container, Deployment, EnvValue, Secret, SecretValue } from 'cdk8s-plus';
import { Construct } from 'constructs';

export class Redis extends Construct {
  public readonly password: SecretValue;
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
      secret: Secret.fromSecretName(redis.releaseName),
      key: 'redis-password',
    };

    new Deployment(this, 'redis-test', {
      containers: [
        new Container({
          image: 'redis',
          command: ['/bin/bash', '-c', 'redis-cli --pass $REDIS_PASSWORD, -h $REDIS_HOST PING'],
          env: {
            REDIS_HOST: EnvValue.fromValue(this.masterHost),
            REDIS_PASSWORD: EnvValue.fromSecretValue(this.password),
          },
        }),
      ],
    });
  }
}