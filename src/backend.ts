import { Image } from 'cdk8s-image';
import * as kp from 'cdk8s-plus';
import { Construct } from 'constructs';

export interface BackendOptions {
  /**
   * Number of replicas to deploy for this service.
   * @default 1
   */
  readonly replicas?: number;

  /**
   * Environment variables to expose to the app.
   */
  readonly env?: { [name: string]: kp.EnvValue };

  /**
   * The port exposed by the pod.
   *
   * And environment variable `PORT` will also include this value in the running
   * container.
   *
   * @default 8080
   */
  readonly port?: number;

  /**
   * The image registry to push to.
   * @default - docker hub
   */
  readonly registry?: string;

  /**
   * @default "/"
   */
  readonly readinessUrl?: string;
}

export interface BackendProps extends BackendOptions {
  readonly codeDirectory: string;
}

export class Backend extends kp.Service {
  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    const image = new Image(scope, `${id}/image`, {
      dir: props.codeDirectory,
      registry: props.registry,
    });

    const readinessUrl = props.readinessUrl ?? '/';
    const port = props.port ?? 8080;
    const container = new kp.Container({
      image: image.url,
      readiness: kp.Probe.fromHttpGet(readinessUrl),
      port,
      env: {
        PORT: kp.EnvValue.fromValue(port.toString()),
        ...props.env,
      },
    });

    const deployment = new kp.Deployment(this, 'deployment', {
      replicas: props.replicas,
      containers: [container],
    });

    this.addDeployment(deployment, port);
  }
}

