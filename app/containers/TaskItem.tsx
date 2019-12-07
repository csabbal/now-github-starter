import { connect } from "react-redux";
import * as Pages from "../../components/pages";
import { AppState } from "../states";
import { isNil } from "ramda";
import { logIn, logOut } from "../states/reducers/authentication";
import { getTask } from "../states/reducers/task";
import { LoginContainer } from "./Login";
import { Tasks } from "../..";
import React from "react";

export const TaskItemContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props: { id: string }) =>
    taskItemSelector(state, dispatch, props)
)(Pages.TaskItem);

function taskItemSelector(
  ...params: [AppState, Function, { id: string }]
): Tasks.Item.Props {
  const [state, dispatch, props] = params;

  const {
    navigation: { current },
    task: { data, tempData, isLoading }
  } = state;

  let id = props.id;

  let location = isNil(id) && current && current.pathname.slice(1).split("/");

  if (location && location[0] == "task") {
    id = current.query.id;
  }
  const item = tempData && id && tempData[id];
  return {
    isLoading: id && isLoading == id,
    data: item
  };
}
