import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Request } from 'express';
import { getOrigin } from './req.helper';
import { ICorsSettings } from './types';
import { corsNotAllowed } from './errors';

const corsSettings = <ICorsSettings>{
  allowedOrigins: [], // url whitelist
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedCredentials: true,
};

export const corsOptionsDelegate: unknown = (
  req: Request,
  callback: (err: Error, options: CorsOptions) => void,
) => {
  const corsOptions: CorsOptions = {
    methods: corsSettings.allowedMethods,
    credentials: corsSettings.allowedCredentials,
    origin: false,
  };
  let error: Error | null = null;

  const origin = getOrigin(req);

  if (
    !origin ||
    !corsSettings.allowedOrigins.length ||
    // eslint-disable-next-line no-bitwise
    ~corsSettings.allowedOrigins.indexOf(origin)
  ) {
    corsOptions.origin = true;
    error = null;
  } else {
    corsOptions.origin = false;
    error = corsNotAllowed({ raise: false });
  }

  callback(error, corsOptions);
};
