import { put, take, fork, call, select } from "redux-saga/effects";
import { TaskState } from "../../states/reducers/task";
import { taskActions, setTask } from "../../states/reducers/task";
import task from "../../../backend/task";
import { getTaskOptions } from "../../states/selectors/task";
import { Task } from "../../../models/task";

/*****************************************************************************/

export function* getTask(actionStart: number, actionDesc: boolean) {
  const { length, limit, desc }: Partial<TaskState> = yield select(
    getTaskOptions
  );

  const end = actionStart ? actionStart : length;

  if (desc != actionDesc || limit + end > length) {
    const getTaskResult: Task.getTask = yield call(
      task.getTaskRequest,
      end,
      limit,
      actionDesc
    );
    yield put(
      setTask({
        data: getTaskResult.tasks
      })
    );
  }
}

/******************************* WATCHER *************************************/

export function* watchGetTask() {
  while (true) {
    const { start, desc } = yield take(taskActions.GET_TASK);
    yield fork(getTask, start, desc);
  }
}
