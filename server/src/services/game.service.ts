import { GameStatus, JoinGameError, JoinGameErrorType, Player } from '../types';
import { myDataSource } from '../app-data-source';
import { Game } from '../entity';

export const getGamesList = async (): Promise<Array<Game>> => {
  const gameRepository = myDataSource.getRepository(Game);
  const res = await gameRepository.find();
  return res;
};

export const getGameById = async (id: string): Promise<Game | null> => {
  const gameRepository = myDataSource.getRepository(Game);
  return gameRepository.findOne({ where: { id }});
}

export const createNewGame = async (game: Partial<Game>) => {
  const gameRepository = myDataSource.getRepository(Game);
  const entity = gameRepository.create(game);

  return await gameRepository.save(entity);
}

export const updateGame = async (game: Partial<Game>) => {
  const gameRepository = myDataSource.getRepository(Game);

  return await gameRepository.save({...game});
}

export const deleteGameById = async (id: string) => {
  const gameRepository = myDataSource.getRepository(Game);

  return await gameRepository.delete(id);
}

export const joinGame = async (game: Game, player: Player): Promise<Game> => {
  const gameRepository = myDataSource.getRepository(Game);

  if (game.status !== GameStatus.New) {
    throw new JoinGameError(JoinGameErrorType.GameALreadyStarted, `You can not join the game that already started`);
  }

  if (Array.isArray(game?.players) && game?.playersMaxCount <= game?.players?.length) {
    throw new JoinGameError(JoinGameErrorType.MaxPlayersCountReached, `Max players's count reached`);
  }

  if (Array.isArray(game?.players) && game?.players?.some(p => p.name === player.name)) {
    throw new JoinGameError(JoinGameErrorType.PlayerAlreadyExists, `Player with name: ${player.name} already joined the game`);
  }

  Array.isArray(game.players) ? game.players.push(player) : game.players = [player];

  return await gameRepository.save(game);
};