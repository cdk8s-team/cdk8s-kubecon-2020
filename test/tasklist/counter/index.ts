import * as express from 'express';
import * as redis from 'redis';

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_MASTER,
});

const port = process.env.PORT ?? 8080;

const server = express();

server.all('/*', (req, res) => {

  if (req.method === 'GET') {
    return client.get('counter', (err, data) => {
      if (err) {
        return res.send(err);
      }

      if (!data) {
        return res.send('no data\n');
      }

      return res.send(`counter=${data}\n`);
    });
  }

  if (req.method === 'POST') {
    return client.incr('counter', (err, data) => {
      if (err) {
        return res.send(err);
      }

      return res.send(`counter=${data}\n`);
    });
  }

  return res.send(`unexpected method ${req.method} ${req.url}`);
});

console.error(`listening on port ${port}`);

client.get('counter', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

server.listen(port);