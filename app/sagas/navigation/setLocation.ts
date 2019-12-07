import { put, take, fork, call, select } from "redux-saga/effects";
import { getTaskOptions } from "../../states/selectors/task";
import { TaskState } from "../../states/reducers/task";
import { getTask, getTaskById } from "../../states/reducers/task";
import { navigationActions } from "../../states/reducers/navigation";
import { isNil } from "ramda";

/*****************************************************************************/

export function* setLocation(location: {
  pathname: string;
  query: { id: string };
}) {
  const pathName = location.pathname;
  const query = location.query;

  console.warn("location change payload", location);

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

export function* watchSetLocation() {
  while (true) {
    const { location } = yield take(navigationActions.CHANGE_LOCATION);
    yield fork(setLocation, location);
  }
}
