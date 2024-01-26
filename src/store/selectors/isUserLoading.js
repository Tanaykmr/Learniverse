import {selector} from "recoil"
import userState from "../atoms/user"

const isUserLoading = selector({
    key: "isUserLoading",
	get: ({get}) => {
    const state = get(userState); 

    return state.isLoading;
    },
});

export default isUserLoading;

