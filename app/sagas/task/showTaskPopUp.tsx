import { put, take, fork, call } from "redux-saga/effects";
import { taskActions } from "../../states/reducers//task";
import { showPopUp } from "../../states/reducers/main";
import { setCookie, getCookie } from "../../globals/helpers";
import { TaskItemContainer } from "../../containers/TaskItem";
import React, { Component } from "react";

/*****************************************************************************/

export function* showTaskPopUp(id: string) {
  console.warn("showTask saga", id);
  yield put(
    showPopUp({
      id,
      content: <TaskItemContainer id={id} />
    })
  );
}

/******************************* WATCHER *************************************/

export function* watchShowTaskPopUp() {
  while (true) {
    const { id } = yield take(taskActions.SHOW_TASK_POPUP);
    yield fork(showTaskPopUp, id);
  }
}
