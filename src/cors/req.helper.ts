import { Request } from 'express';

export function getOrigin(req: Request) {
  const { origin } = req.headers;

  if (!origin || typeof origin === 'string') {
    return origin as string;
  }

  return origin[0];
}
