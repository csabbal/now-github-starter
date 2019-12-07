import { put, take, fork, call, select } from "redux-saga/effects";
import { authActions } from "../../states/reducers/authentication";
import { setCookie, getCookie } from "../../globals/helpers";
import { getTaskOptions } from "../../states/selectors/task";
import { TaskState } from "../../states/reducers/task";
import { getTask, getTaskById } from "../../states/reducers/task";
import { getCurrentPage } from "../../states/selectors/navigation";
import { initialized } from "../../states/reducers/runTime";
import { isNil } from "ramda";

/*****************************************************************************/

export function* setAuthenticationState(userId: string, userName: string) {
  setCookie("userId", userId || "");
  setCookie("userName", userName || "");
  console.warn("getAuth id", [getCookie("userId"), getCookie("userName")]);

  const { current } = yield select(getCurrentPage);

  const pathName = current.pathname;
  const query = current.query;

  yield put(initialized());

  yield getDataByPage(pathName, query);
}

function* getDataByPage(pathName: string, query: { id: string }) {
  const path = pathName.slice(1).split("/");

  const { limit, desc, isInit }: Partial<TaskState> = yield select(
    getTaskOptions
  );

  console.warn("getDataByPage$", [pathName, query]);
  if (path[0] == "tasks") {
    if (!isInit) {
      yield put(getTask({ limit, start: 0, desc }));
    }
  }
  if (path[0] == "task") {
    if (query.id) {
      yield put(getTaskById({ id: query.id }));
    }
  }
}

/******************************* WATCHER *************************************/

export function* watchSetAuthenticationState() {
  while (true) {
    const { userId, userName } = yield take(
      authActions.SET_AUTHENTICATION_STATE
    );
    yield fork(setAuthenticationState, userId, userName);
  }
}
