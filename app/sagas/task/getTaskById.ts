import { put, take, fork, call, select } from "redux-saga/effects";
import { TaskState } from "../../states/reducers/task";
import { taskActions, setTask, setTaskById } from "../../states/reducers/task";
import task from "../../../backend/task";
import { getTaskOptions, getTasks } from "../../states/selectors/task";
import { Task } from "../../../models/task";
import { isNil } from "ramda";

/*****************************************************************************/

export function* getTaskById(id: string) {
  const { data }: Partial<TaskState> = yield select(getTasks);

  if (isNil(data) || isNil(data[id])) {
    const getTaskResult: Task.getTask = yield call(task.getTaskByIdRequest, id);
    yield put(
      setTaskById({
        data: getTaskResult.tasks
      })
    );
  } else {
    yield put(
      setTaskById({
        data: { [id]: data[id] }
      })
    );
  }
}

/******************************* WATCHER *************************************/

export function* watchGetTaskById() {
  while (true) {
    const { id } = yield take(taskActions.GET_TASK_BY_ID);
    yield fork(getTaskById, id);
  }
}
