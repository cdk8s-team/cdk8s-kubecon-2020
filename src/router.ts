import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as kp from 'cdk8s-plus';
import { Construct } from 'constructs';


export class Router extends Construct {
  private readonly ingress: kp.Ingress;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.ingress = new kp.Ingress(this, 'ingress');
  }

  public addBackend(url: string, directory: string, options: BackendOptions = {}) {
    if (fs.existsSync(path.join(directory, 'index.ts'))) {
      const service = new TypeScriptBackend(this, `runtime-${url}`, {
        codeDirectory: directory,
        ...options,
      });

      this.ingress.addRule(url, kp.IngressBackend.fromService(service));
      return service;
    }

    throw new Error(`unable to determine runtime from contents of ${directory}`);
  }
}

export interface BackendOptions {
  /**
   * Number of replicas to deploy for this service.
   * @default 1
   */
  readonly replicas?: number;
}

interface BackendProps extends BackendOptions {
  readonly codeDirectory: string;
  readonly image: string;
  readonly mountDir: string;
}

class Backend extends kp.Service {
  constructor(scope: Construct, id: string, props: BackendProps) {
    super(scope, id);

    const port = 8080;
    const container = new kp.Container({
      image: props.image,
      port,
      env: { POST: kp.EnvValue.fromValue(port.toString()) },
    });

    const hash = crypto.createHash('sha256');

    for (const source of fs.readdirSync(props.codeDirectory)) {
      const filepath = path.join(props.codeDirectory, source);
      if (!fs.statSync(filepath).isFile()) {
        continue; // skip non files
      }

      const data = fs.readFileSync(filepath);
      hash.update(data);
    }

    const sourceHash = hash.digest('hex');

    const deployment = new kp.Deployment(this, `deployment-${sourceHash}`, {
      spec: {
        replicas: props.replicas,
        podSpecTemplate: {
          containers: [container],
        },
      },
    });

    const cm = new kp.ConfigMap(this, 'code');
    cm.addDirectory(props.codeDirectory);
    container.mount(props.mountDir, kp.Volume.fromConfigMap(cm));

    this.spec.addDeployment(deployment, port);
  }
}

interface TypeScriptBackendProps extends BackendOptions {
  readonly codeDirectory: string;
}

class TypeScriptBackend extends Backend {
  constructor(scope: Construct, id: string, props: TypeScriptBackendProps) {
    super(scope, id, {
      image: 'localhost:5000/ekpress-typescript',
      mountDir: '/app/user',
      codeDirectory: props.codeDirectory,
      replicas: props.replicas,
    });
  }
}