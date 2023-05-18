import { Response } from 'express';

export {};

declare global {
  type TypedResponse<T> = Omit<Response, 'json'> & { json(data: T): Response };

  type ServerResponse = TypedResponse<{
    data?: any;
    error?: string;
  }>;
}
