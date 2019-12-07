import { all, fork } from "redux-saga/effects";
import { watchLogIn } from "./logIn";
import { watchLogOut } from "./logOut";
import { watchGetAuthenticationState } from "./getAuthenticationState";
import { watchSetAuthenticationState } from "./setAuthenticationState";

export default function* authenticationSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGetAuthenticationState),
    fork(watchSetAuthenticationState)
  ]);
}
