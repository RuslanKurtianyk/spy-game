import { Request, Response } from 'express';
import { createNewGame, deleteGameById, getGamesList, getGameById, updateGame } from '../services/game.service';
import { Game } from 'src/entity';

export const GameController = {
  getList: async (req: Request, res: Response): Promise<void> => {
    res.send(await getGamesList());
  },
  getOne: async (req: Request, res: Response): Promise<void> => {
    res.send(await getGameById(req.params.id));
  },
  create: async (req: Request<Partial<Game>>, res: Response) => {
    const result = await createNewGame(req.body);
    res.send(result);
  },
  update: async (req: Request, res: Response): Promise<void> => {
    res.send(await updateGame(req.body));
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    res.send(await deleteGameById(req.params.id));
  }
};
