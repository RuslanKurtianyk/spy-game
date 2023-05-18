export class GameNotFoundError extends Error {
  constructor(message: string = 'Game not found') {
    super(message);
    this.message = message;
  }
}