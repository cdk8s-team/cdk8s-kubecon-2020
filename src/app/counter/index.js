import * as redis from 'redis';
import * as http from 'http';

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_MASTER,
});

const port = process.env.PORT ?? 8080;

const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    return client.get('counter', (err, data) => {
      if (err) {
        return res.end(err.message);
      }

      if (!data) {
        return res.end('no data\n');
      }

      return res.end(`counter=${data}\n`);
    });
  }

  if (req.method === 'POST') {
    return client.incr('counter', (err, data) => {
      if (err) {
        return res.end(err.message);
      }

      return res.end(`counter=${data}\n`);
    });
  }

  res.statusCode = 404;
  return res.end('not found\n');
});

console.error(`listening on port ${port}`);
server.listen(port);
