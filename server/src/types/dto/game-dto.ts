import { GameStatus, PlayerRole } from '../enum';
import { Player } from '../model';

export interface GameDto {
  id: string;
  name: string;
  players: Player[];
  status: GameStatus;
  admin?: string | null;
  location?: string | null;
  playersMaxCount: number;
  playersMinCount: number;
  currentUserRole?: PlayerRole;
}