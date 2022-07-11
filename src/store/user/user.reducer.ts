import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInSuccess, signOutSuccess } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }
  return state;
};
