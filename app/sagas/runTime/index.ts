import { all, fork } from "redux-saga/effects";
import { watchStart } from "./start";
import { watchInitial } from "./initial";

export default function* runTimeSaga() {
  yield all([fork(watchStart), fork(watchInitial)]);
}
