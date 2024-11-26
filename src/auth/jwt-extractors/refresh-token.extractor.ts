import { UnauthorizedException } from '@nestjs/common';

import type { CustomRequest } from 'types';

export const refreshTokenExtractor = (req: CustomRequest) => {
  const refreshToken = req.session.refreshToken;
  if (!refreshToken) throw new UnauthorizedException();

  return refreshToken;
};
