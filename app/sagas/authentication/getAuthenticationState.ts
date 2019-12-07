import { put, take, fork, call } from "redux-saga/effects";
import {
  authActions,
  setAuthenticationState
} from "../../states/reducers/authentication";
import { getCookie } from "../../globals/helpers";
import authentication from "../../../backend/authentication";
import { authentication as authType } from "../../../models/authentication";

/*****************************************************************************/

export function* getAuthenticationState() {
  const id = getCookie("userId");
  console.warn("getAuth id", id);
  const data: authType.LogIn = yield call(
    authentication.getAuthenticationStateRequest,
    id
  );
  yield put(
    setAuthenticationState({
      userId: data.user.id,
      userName: data.user.name,
      isLoggedIn: data.isLoggedIn
    })
  );
}

/******************************* WATCHER *************************************/

export function* watchGetAuthenticationState() {
  while (true) {
    yield take(authActions.GET_AUTHENTICATION_STATE);
    yield fork(getAuthenticationState);
  }
}
