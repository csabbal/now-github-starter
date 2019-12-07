import { put, take, fork, call } from "redux-saga/effects";
import { runTimeActions } from "../../states/reducers/runTime";
import { getAuthenticationState } from "../../states/reducers/authentication";
import { navigationActions } from "../../states/reducers/navigation";

/*****************************************************************************/

export function* start() {
  yield put(getAuthenticationState());
}

/******************************* WATCHER *************************************/

export function* watchStart() {
  while (true) {
    yield take(runTimeActions.START);
    yield fork(start);
  }
}
