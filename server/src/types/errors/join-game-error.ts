import { JoinGameErrorType } from '../enum';

export class JoinGameError extends Error {
  type: JoinGameErrorType;

  constructor(type: JoinGameErrorType, message: string) {
    super(message);
    this.type = type;
    this.message = message;
  }
}