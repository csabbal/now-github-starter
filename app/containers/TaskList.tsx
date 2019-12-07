import { connect } from "react-redux";
import * as Pages from "../../components/pages";
import { AppState } from "../states";
import { getTask, showTaskPopUp } from "../states/reducers/task";
import { Tasks } from "../..";

export const TaskListContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props) => taskListSelector(state, dispatch, props)
)(Pages.TaskList);

function taskListSelector(
  ...params: [AppState, Function, any]
): Tasks.List.Props {
  const [state, dispatch] = params;

  const {
    task: {
      data,
      lastDate,
      desc,
      limit,
      length,
      isAllItemDownloaded,
      isLoading
    }
  } = state;

  return {
    more: () => {
      dispatch(getTask({ start: length, desc, limit }));
    },
    show: (key: string) => {
      console.warn("show");
    },
    showDialog: (id: string) => {
      dispatch(showTaskPopUp({ id }));
    },
    isLoading: isLoading == "all",
    lastDate,
    data,
    isAllItemDownloaded
  };
}
