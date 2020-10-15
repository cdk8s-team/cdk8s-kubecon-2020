import * as express from 'express';
import * as body_parser from 'body-parser';

const port = process.env.PORT ?? 8080;

const server = express();

import * as user from './user';

server.all('/*', body_parser.json(), user.handler);

const shutdown = (code: number) => () => {
  console.error(`exiting with code ${code}`);
  process.exit(code)
};

process.on('SIGHUP', shutdown(1));
process.on('SIGINT', shutdown(2));
process.on('SIGTERM', shutdown(15));

console.error(`listening on port ${port}`);
server.listen(port);