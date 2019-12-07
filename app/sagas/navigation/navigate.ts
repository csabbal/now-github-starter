import { put, take, fork, call, select } from "redux-saga/effects";
import { TaskState } from "../../states/reducers/task";
import {
  navigationActions,
  navigate as navigateAction
} from "../../states/reducers/navigation";
import task from "../../../backend/task";
import { getTaskOptions } from "../../states/selectors/task";
import Router from "next/router";

/*****************************************************************************/

export function* navigate(location: string) {
  console.warn("navigate", location);
  Router.push(location);
}

/******************************* WATCHER *************************************/

export function* watchNavigate() {
  while (true) {
    const { location } = yield take(navigationActions.NAVIGATE);
    yield fork(navigate, location);
  }
}
