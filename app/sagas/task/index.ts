import { all, fork } from "redux-saga/effects";
import { watchGetTask } from "./getTask";
import { watchGetTaskById } from "./getTaskById";
import { watchShowTaskPopUp } from "./showTaskPopUp";

export default function* taskSaga() {
  yield all([
    fork(watchGetTask),
    fork(watchGetTaskById),
    fork(watchShowTaskPopUp)
  ]);
}
