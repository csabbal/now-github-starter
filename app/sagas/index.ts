import { all, fork } from "redux-saga/effects";
import authenticationSaga from "./authentication";
import runTime from "./runTime";
import task from "./task";
import navigation from "./navigation";

export default function* rootSaga() {
  yield all([
    fork(authenticationSaga),
    fork(runTime),
    fork(task),
    fork(navigation)
  ]);
}
