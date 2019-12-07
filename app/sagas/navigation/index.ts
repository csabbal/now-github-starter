import { all, fork } from "redux-saga/effects";
import { watchNavigate } from "./navigate";
import { watchSetLocation } from "./setLocation";

export default function* navigateSage() {
  yield all([fork(watchNavigate), fork(watchSetLocation)]);
}
