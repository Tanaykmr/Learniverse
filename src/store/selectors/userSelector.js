import { selector } from "recoil";
import userState from "../atoms/User";

export const isUserLoading = selector({
  key: "isUserLoading",
  get: ({ get }) => {
    const state = get(userState);

    return state.isLoading;
  },
});

export const userEmailState = selector({
  key: "userEmailState",
  get: ({ get }) => {
    const state = get(userState);

    return state.userEmail;
  },
});

export const userProfileState = selector({
  key: "userProfile",
  get: ({ get }) => {
    const state = get(userState);

    return state.userProfile;
  },
});