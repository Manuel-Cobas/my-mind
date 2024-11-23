import { Request } from 'express';

export type UserSession = { userId: string; email: string };

export type CustomSession = {
  session: { user: UserSession };
};

export type CustomRequest = Request & CustomSession;
