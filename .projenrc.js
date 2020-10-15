const { TypeScriptAppProject } = require('projen');

const project = new TypeScriptAppProject({
  name: 'kubecon-demo',
  deps: [
    'constructs',
    'cdk8s-plus',
    'cdk8s',
    'express'
  ],
  devDeps: [
    'ts-node',
    '@types/express'
  ],
});

project.addScript('deploy', 
  'cdk8s --app "npx ts-node src/main.ts" synth', 
  'kubectl apply -f dist/');

project.synth();
