import { atom } from 'recoil';
import { UserType } from '../interfaces/interfaces';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom<UserType>({
    key: 'userState',
    default: {
        userId: 0,
        userName: 'Guest',
        password: 'Guest',
    },
    effects_UNSTABLE: [persistAtom],
});
