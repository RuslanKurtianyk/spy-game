export class NameQueryParamMissingError extends Error {
  constructor(message: string = 'User name query parameter missing') {
    super(message);
    this.message = message;
  }
}