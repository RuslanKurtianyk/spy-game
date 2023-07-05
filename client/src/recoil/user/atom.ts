import { atom } from 'recoil';
import { User } from '../../model/user.interface';

const userAtom = atom<User>({
  key: 'userAtom',
  default: {
    nickName: ''
  },
});

export default userAtom;