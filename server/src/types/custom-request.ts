import { Request } from 'express';

type CustomRequest = Request & {
  userId?: string;
}

export type { CustomRequest }