export interface Game {
  name: string;
  status: string;
  players: Array<{name: string; role?: string}>
}