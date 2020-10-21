const Yalm = require('./node_modules/cdk8s/lib/yaml').Yaml;
const fs = require('fs');

const YAML = require("js-yaml");

const x = YAML.safeLoadAll(fs.readFileSync('./test.yaml', 'utf-8'));
console.log(JSON.stringify(x, undefined, 2));