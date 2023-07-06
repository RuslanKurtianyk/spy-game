import { atom, selector } from 'recoil';
import { Game } from '../../model/game.interface';
import { localStorageEffect } from '../effects/local-storage.effect';

const currentGameIdAtom = atom<string>({
  key: 'currentGameIdAtom',
  default: '',
  effects: [
    localStorageEffect('current_game_id'),
  ]
});

const currentGameQuery = selector<Game>({
  key: 'CurrentUserName',
  get: async ({get}) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/games/${get(currentGameIdAtom)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      return data;
    } catch(error) {
      throw error;
    }
  },
});

export {
  currentGameIdAtom,
  currentGameQuery,
};