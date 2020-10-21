const { TypeScriptAppProject } = require('projen');

const project = new TypeScriptAppProject({
  name: 'kubecon-demo',
  deps: [
    'constructs',
    'cdk8s-plus',
    'cdk8s',
    'cdk8s-image',
  ],
  devDeps: [
    'ts-node',
    '@types/express',
    '@types/redis',
    'redis',
    'express'
  ],
});

project.addScript('deploy', 
  'cdk8s --app "npx ts-node test/tasklist/main.ts" synth', 
  'kubectl apply -f dist/');

project.synth();
