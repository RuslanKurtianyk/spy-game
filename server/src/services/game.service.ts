import { GameStatus, GameError, GameErrorType, Player, PlayerRole } from '../types';
import { myDataSource } from '../app-data-source';
import { Game } from '../entity';
import { getRandomInteger } from '../shared';
import { getRandomLocation } from './location.service';

export const getGameById = async (id: string): Promise<Game | null> => {
  const gameRepository = myDataSource.getRepository(Game);
  return gameRepository.findOne({ where: { id }});
}

export const createNewGame = async (game: Partial<Game>) => {
  const gameRepository = myDataSource.getRepository(Game);
  const entity = gameRepository.create(game);

  return await gameRepository.save(entity);
}

export const joinGame = async (game: Game, player: Player): Promise<Game> => {
  const gameRepository = myDataSource.getRepository(Game);

  if (game.status !== GameStatus.New) {
    throw new GameError(GameErrorType.GameAlreadyStarted, `You can not join the game that already started`);
  }

  if (Array.isArray(game?.players) && game?.playersMaxCount <= game?.players?.length) {
    throw new GameError(GameErrorType.MaxPlayersCountReached, `Max players's count reached`);
  }

  if (Array.isArray(game?.players) && game?.players?.some(p => p.name === player.name)) {
    throw new GameError(GameErrorType.PlayerAlreadyExists, `Player with name: ${player.name} already joined the game`);
  }

  Array.isArray(game.players) ? game.players.push(player) : game.players = [player];

  return await gameRepository.save(game);
};

export const startGame = async (game: Game): Promise<Game> => {
  const gameRepository = myDataSource.getRepository(Game);

  const { players, playersMaxCount, playersMinCount } = game;

  if (Array.isArray(game?.players) && playersMinCount >= game?.players?.length) {
    throw new GameError(GameErrorType.NotEnoughPlayers, `There is not enough players to start the game`);
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