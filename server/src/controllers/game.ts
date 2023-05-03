import { Request, Response } from 'express';
import { createNewGame, getGamesList, getGameById } from '../services/game.service';
import { Game } from 'src/entity';

export const getGameList = async (req: Request, res: Response): Promise<void> => {
  res.send(await getGamesList());
};

export const getOneGame = async (req: Request, res: Response): Promise<void> => {
  res.send(await getGameById(req.params.id));
};

export const createGame = async (req: Request<Partial<Game>>, res: Response) => {
  const result = await createNewGame(req.body);
  res.send(result);
};