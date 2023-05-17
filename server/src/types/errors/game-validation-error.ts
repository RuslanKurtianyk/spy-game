import { GameValidationErrorType } from '../enum';

export class GameValidationError extends Error {
  type: GameValidationErrorType;

  constructor(type: GameValidationErrorType, message: string) {
    super(message);
    this.type = type;
    this.message = message;
  }
}