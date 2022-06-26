import { HttpException } from '@nestjs/common';

import { IErrData } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const corsNotAllowed = (data?: IErrData) => {
  const err = new HttpException(
    {
      status: 400,
      error: data?.msg || 'CORS_NOT_ALLOWED',
    },
    400,
  );

  if (data?.raise) {
    throw err;
  }

  return err;
};
