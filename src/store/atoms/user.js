import {atom} from "recoil";




const userState = atom({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: null,
    userProfile: null,
    // user: null,
    },
});

export default userState;