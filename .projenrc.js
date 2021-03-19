const { TypeScriptAppProject } = require('projen');

const project = new TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'kubecon-demo',
  deps: [
    'constructs',
    'cdk8s-plus',
    'cdk8s',
    'cdk8s-image',
  ],
  devDeps: [
    'ts-node',
    '@types/redis',
    'redis',
  ],
});

const deploy = project.addTask('deploy');
deploy.exec('cdk8s --app "npx ts-node src/app/main.ts" synth');
deploy.exec('kubectl apply -f dist/ --prune --selector "prune=kubecon-demo"');

project.synth();
