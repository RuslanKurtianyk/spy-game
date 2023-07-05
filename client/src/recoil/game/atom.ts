import { atom } from 'recoil';
import { Game } from '../../model/game.interface';

const gameAtom = atom<Game>({
  key: 'gameAtom',
  default: {
    name: '', 
    status: 'New',
    players: [],
  },
});

export default gameAtom;