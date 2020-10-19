import * as express from 'express';

export async function handler(req: express.Request, res: express.Response) {
  res.send(`Hello, ${req.url}!`);
}
