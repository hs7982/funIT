import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist();

export const UserState = atom({
        key: 'UserState',
        default: {email: null, id: null, name: null, profileImage: null},
        effects_UNSTABLE: [persistAtom],
    }
)

export const IsLoginState = atom({
        key: 'IsLoginState',
        default: false,
        effects_UNSTABLE: [persistAtom],
    }
)