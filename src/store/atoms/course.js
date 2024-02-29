import { atom } from "recoil";

const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
export default courseState;
