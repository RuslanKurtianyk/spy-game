import { Request, Response } from 'express';
import { createNewGame, finishGame, getGameById, joinGame, startGame } from '../services/game.service';
import { Game } from '../entity';
import { JoinGameBody, JoinGameParams, WithId, GameStatus, GetGameQuery } from '../types';
import { GameValidationError, GameNotFoundError, NameQueryParamMissingError } from '../types/errors';

export const GameController = {
  getOne: async (
    request: Request<WithId, ServerResponse, unknown, GetGameQuery>,
    response: ServerResponse
  ): Promise<void> => {
    const { name } = request.query;
    try {
      const game = await getGameById(request.params.id, name);
      response.status(200).send({data: game});
    } catch (error) {
      if (error instanceof GameNotFoundError) {
        response.status(404).send({error: error.message});
        return;
      }

      if (error instanceof NameQueryParamMissingError) {
        response.status(400).send({error: error.message});
        return;
      }

      response.status(500).send('Something went wrong');
    }
  },
  create: async (request: Request<Partial<Game>>, response: Response) => {
    const result = await createNewGame(request.body);
    response.send(result);
  },
  join: async (
    request: Request<JoinGameParams, string, JoinGameBody>,
    response: Response
  ): Promise<void> => {
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
      if (error instanceof GameValidationError) {
        response.status(400).send(error.message);
        return;
      }
      response.status(500).send('Something went wrong');
    }
  },
  start: async (
    request: Request<any, string, any>,
    response: ServerResponse
  ): Promise<void> => {
    const { gameId } = request.params;

    try {
      const game = await getGameById(gameId);

      if (!game) {
        response.status(404).send(`No game found with id: ${gameId}`);
        return;
      }
  
      if (game.status === GameStatus.InProgress) {
        response.status(400).send('Game already started');
      }

      await startGame(game);

      response.status(200).send(`You started the game`);
    } catch (error) {
      if (error instanceof GameValidationError) {
        response.status(400).send(error.message);
        return;
      }
      response.status(500).send('Something went wrong');
    }
  },
  finish: async (
    request: Request<any, string, any>,
    response: Response
  ): Promise<void> => {
    const { gameId } = request.params;

    try {
      const game = await getGameById(gameId);
      await finishGame(game);
    } catch(error) {
      response.status(500).send('Something went wrong');
    }

  }
};
