import { Request } from 'express';

export type UserSession = { sub: string; email: string };

export type CustomSession = {
  session: { user: UserSession; refreshToken: string };
};

export type CustomRequest = Request & CustomSession;
