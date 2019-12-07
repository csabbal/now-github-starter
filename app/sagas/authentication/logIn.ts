import { put, take, fork, call } from "redux-saga/effects";
import {
  authActions,
  setAuthenticationState
} from "../../states/reducers/authentication";
import authentication from "../../../backend/authentication";

/*****************************************************************************/

export function* logIn(name: string, pass: string) {
  const data = yield call(authentication.logInRequest, name, pass);
  yield put(
    setAuthenticationState({
      userId: data.user.id,
      userName: data.user.name,
      isLoggedIn: true
    })
  );
}

/******************************* WATCHER *************************************/

export function* watchLogIn() {
  while (true) {
    const { name, pass } = yield take(authActions.LOGIN);
    yield fork(logIn, name, pass);
  }
}
