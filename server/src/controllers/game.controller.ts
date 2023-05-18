import { Request, Response } from 'express';
import { createNewGame, getGameById, joinGame, startGame } from '../services/game.service';
import { Game } from '../entity';
import { JoinGameBody, JoinGameParams, WithId, GameStatus, GetGameQuery } from '../types';
import { GameValidationError, GameNotFoundError, NameQueryParamMissingError } from '../types/errors';

export const GameController = {
  getOne: async (
    request: Request<WithId, unknown, unknown, GetGameQuery>,
    response: Response
  ): Promise<void> => {
    const { name } = request.query;
    try {
      const game = await getGameById(request.params.id, name);
      response.status(200).send(game);
    } catch (error) {
      if (error instanceof GameNotFoundError) {
        response.status(404).send(error.message);
        return;
      }

      if (error instanceof NameQueryParamMissingError) {
        response.status(400).send(error.message);
        return;
      }
      console.log(error);
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
    response: Response
  ): Promise<void> => {
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
      if (error instanceof GameValidationError) {
        response.status(400).send(error.message);
        return;
      }
      response.status(500).send('Something went wrong');
    }
  },
};
