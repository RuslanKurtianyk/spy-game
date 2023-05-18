import { GameStatus, PlayerRole } from '../types';
import { Game } from '../entity';
import { GameDto } from '../types/dto';

export const getGameResponse = (game: Game, userName: string = ''): GameDto => {
  const gameDto: GameDto = { ...structuredClone(game)};
  const userRole = gameDto.players ? gameDto.players.find(player => player.name === userName)?.role || PlayerRole.Resident : PlayerRole.Resident;

  if (userRole === PlayerRole.Spy) {
    gameDto.location = null;
  }

  gameDto.currentUserRole = gameDto.status === GameStatus.InProgress ? userRole : undefined;
  if (gameDto.players && Array.isArray(gameDto.players)) {
    gameDto.players.forEach(player => player.role = undefined);
  }

  return gameDto;

}