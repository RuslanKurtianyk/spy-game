import { Request, Response } from 'express';
import { createNewGame, deleteGameById, getGamesList, getGameById, updateGame, joinGame, startGame } from '../services/game.service';
import { Game } from '../entity';
import { GameError, JoinGameBody, JoinGameParams, WithId, GameStatus } from '../types';

export const GameController = {
  getList: async (request: Request, response: Response): Promise<void> => {
    response.send(await getGamesList());
  },
  getOne: async (request: Request<WithId>, response: Response): Promise<void> => {
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
  delete: async (request: Request<WithId>, response: Response): Promise<void> => {
    response.send(await deleteGameById(request.params.id));
  },
  join: async (request: Request<JoinGameParams, string, JoinGameBody>, response: Response): Promise<void> => {
    const { gameId } = request.params;
    const { name } = request.body;
    const game = await getGameById(gameId);

    if (!game) {
      response.status(404).send(`No game found with id: ${gameId}`);
      return;
    }

    try {
      await joinGame(game, { name });
      response.status(200).send(`You joined the game`);
    } catch (error) {
      if (error instanceof GameError) {
        response.status(400).send(error.message);
        return;
      }
      response.status(500).send('Something went wrong');
    }
  },
  start: async (request: Request<any, string, any>, response: Response): Promise<void> => {
    const { gameId } = request.params;
    const game = await getGameById(gameId);

    if (!game) {
      response.status(404).send(`No game found with id: ${gameId}`);
      return;
    }

    if (game.status === GameStatus.InProgress) {
      response.status(400).send('Game already started');
    }

    try {
      await startGame(game);
      response.status(200).send(`You started the game`);
    } catch (error) {
      console.log(error);
      response.status(500).send('Something went wrong');
    }
  }
};
