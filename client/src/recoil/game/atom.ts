import { atom, selector } from 'recoil';
import { Game } from '../../model/game.interface';
import { localStorageEffect } from '../effects/local-storage.effect';

const currentGameIdAtom = atom<string>({
  key: 'currentGameIdAtom',
  default: '',
  effects: [localStorageEffect('current_game_id')],
});

const currentGameQuery = selector<Game>({
  key: 'currentGame',
  get: async ({ get }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/games/${get(currentGameIdAtom)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if ([500, 400, 404].includes(response.status)) {
      throw new Error('Something bad happened');
    }

    const data = await response.json();
    return data;
  },
});

export { currentGameIdAtom, currentGameQuery };
