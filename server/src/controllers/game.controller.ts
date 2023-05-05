import { Request, Response } from 'express';
import { createNewGame, deleteGameById, getGamesList, getGameById, updateGame } from '../services/game.service';
import { Game } from 'src/entity';

export const GameController = {
  getList: async (request: Request, response: Response): Promise<void> => {
    response.send(await getGamesList());
  },
  getOne: async (request: Request, response: Response): Promise<void> => {
    const randomLocation = await getGameById(request.params.id);
    const status = randomLocation ? 200 : 404;
    const result = randomLocation ? randomLocation : 'Game not found';
    response.status(status).send(result);

  },
  create: async (request: Request<Partial<Game>>, response: Response) => {
    const result = await createNewGame(request.body);
    response.send(result);
  },
  update: async (request: Request, response: Response): Promise<void> => {
    response.send(await updateGame(request.body));
  },
  delete: async (request: Request, response: Response): Promise<void> => {
    response.send(await deleteGameById(request.params.id));
  }
};
