import { App, Chart, ChartOptions } from 'cdk8s';
import { Construct } from 'constructs';
import { Router } from './router';

class MyChart extends Chart {
  constructor(scope: Construct, id: string, opts: ChartOptions = {}) {
    super(scope, id, opts);

    const router = new Router(this, 'router');
    router.addBackend('/hello', `${__dirname}/hello`);
    router.addBackend('/world', `${__dirname}/world`, { replicas: 3 });
  }
}

const app = new App();
new MyChart(app, 'test');
app.synth();