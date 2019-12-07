import { combineReducers, ReducersMapObject } from "redux";
import authentication, { AuthState } from "./reducers/authentication";
import runTime, { RunTimeState } from "./reducers/runTime";
import task, { TaskState } from "./reducers/task";
import main, { MainState } from "./reducers/main";
import navigation, { NavigationState } from "./reducers/navigation";

export interface AppState {
  authentication: AuthState;
  runTime: RunTimeState;
  task: TaskState;
  main: MainState;
  navigation: NavigationState;
}

export const initialState = {};

export default combineReducers({
  authentication,
  runTime,
  task,
  main,
  navigation
});
