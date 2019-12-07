import { put, take, fork, call } from "redux-saga/effects";
import { runTimeActions } from "../../states/reducers/runTime";
import { navigationActions } from "../../states/reducers/navigation";
import { start } from "../../states/reducers/runTime";

/*****************************************************************************/

export function* initial() {
  yield put(start());
}

/******************************* WATCHER *************************************/

export function* watchInitial() {
  yield take(navigationActions.CHANGE_LOCATION);
  yield fork(initial);
}
