import { GameErrorType } from '../enum';

export class GameError extends Error {
  type: GameErrorType;

  constructor(type: GameErrorType, message: string) {
    super(message);
    this.type = type;
    this.message = message;
  }
}