import {atom} from "recoil";

const userState = atom({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: null
  },
});

export default userState;