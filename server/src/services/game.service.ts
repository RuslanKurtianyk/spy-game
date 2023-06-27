import { GameStatus, GameValidationErrorType, Player, PlayerRole } from '../types';
import { GameValidationError, GameNotFoundError, NameQueryParamMissingError } from '../types/errors';
import { appDataSource } from '../app-data-source';
import { Game } from '../entity';
import { getRandomInteger } from '../shared';
import { getRandomLocation } from './location.service';
import { getGameResponse } from '../utils/get-game-response';

export const getGameById = async (id: string, userName?: string): Promise<Game> => {
  const gameRepository = appDataSource.getRepository(Game);
  const game = await gameRepository.findOne({ where: { id }})

  if (!game) {
    throw new GameNotFoundError();
  }

  if (game.status === GameStatus.InProgress && !userName) {
    throw new NameQueryParamMissingError();
  }

  return getGameResponse(game, userName);
}

export const createNewGame = async (game: Partial<Game>) => {
  const gameRepository = appDataSource.getRepository(Game);
  const entity = gameRepository.create({...game, admin: null});

  return await gameRepository.save(entity);
}

export const joinGame = async (game: Game, player: Player): Promise<Game> => {
  const gameRepository = appDataSource.getRepository(Game);

  if (game.status !== GameStatus.New) {
    throw new GameValidationError(GameValidationErrorType.GameAlreadyStarted, `You can not join the game that already started`);
  }

  if (Array.isArray(game?.players) && game?.playersMaxCount <= game?.players?.length) {
    throw new GameValidationError(GameValidationErrorType.MaxPlayersCountReached, `Max players's count reached`);
  }

  if (Array.isArray(game?.players) && game?.players?.some(p => p.name === player.name)) {
    throw new GameValidationError(GameValidationErrorType.PlayerAlreadyExists, `Player with name: ${player.name} already joined the game`);
  }

  Array.isArray(game.players) ? game.players.push(player) : game.players = [player];

  return await gameRepository.save(game);
};

export const startGame = async (game: Game): Promise<Game> => {
  const gameRepository = appDataSource.getRepository(Game);

  const { players, playersMaxCount, playersMinCount } = game;

  if (Array.isArray(game?.players) && playersMinCount >= game?.players?.length) {
    throw new GameValidationError(GameValidationErrorType.NotEnoughPlayers, `There is not enough players to start the game`);
  }
  const getSpyPlayerIndex = getRandomInteger(0, playersMaxCount);

  const updatedPlayers = players.map((player, index) => {
    player.role =
      getSpyPlayerIndex === index ? PlayerRole.Spy : PlayerRole.Resident;
    return player;
  });

  game.status = GameStatus.InProgress;
  game.players = updatedPlayers;

  const location = await getRandomLocation();
  game.location = location ? location.name : null;

  return await gameRepository.save(game);
};

export const finishGame = async (game: Game): Promise<Game> => {
  const gameRepository = appDataSource.getRepository(Game);
  game.status = GameStatus.Finished;
  return await gameRepository.save(game);
}