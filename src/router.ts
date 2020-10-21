import * as kp from 'cdk8s-plus';
import { Construct } from 'constructs';
import { Backend, BackendOptions } from './backend';

export class Router extends Construct {
  private readonly ingress: kp.Ingress;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.ingress = new kp.Ingress(this, 'ingress');
  }

  public addBackend(url: string, codedir: string, options: BackendOptions = {}) {
    const service = new Backend(this, `runtime-${url}`, {
      codeDirectory: codedir,
      ...options,
    });

    this.ingress.addRule(url, kp.IngressBackend.fromService(service));
    return service;
  }
}
