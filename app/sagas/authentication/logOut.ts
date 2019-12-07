import { put, take, fork, call } from "redux-saga/effects";
import {
  authActions,
  setAuthenticationState
} from "../../states/reducers/authentication";
import authentication from "../../../backend/authentication";

/*****************************************************************************/

export function* logOut(id: string) {
  const data = yield call(authentication.logOutRequest, id);
  yield put(
    setAuthenticationState({
      userId: null,
      userName: null,
      isLoggedIn: false
    })
  );
}

/******************************* WATCHER *************************************/

export function* watchLogOut() {
  while (true) {
    const { id } = yield take(authActions.LOGOUT);
    yield fork(logOut, id);
  }
}
