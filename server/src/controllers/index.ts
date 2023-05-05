import { Request, Response } from 'express';

export const hello = async (req: Request, res: Response): Promise<void> => {
  res.send({data: 'Hello from server'})
};

export * from './game.controller';
export * from './location.controller';

