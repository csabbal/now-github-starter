import { createAction } from "../../globals/helpers";
import { from } from "fromfrom";
import { Task } from "../../../models/task";
import { authActions, SetAuthenticationState } from "./authentication";

type item = Task.TaskItem;

function defaultState(): TaskState {
  return {
    isLoading: null,
    isInit: false,
    data: null,
    tempData: null,
    desc: true,
    limit: 5,
    length: 0,
    lastDate: null,
    isAllItemDownloaded: false
  };
}

export interface TaskState {
  isLoading: string;
  isInit: boolean;
  data: { [key: string]: item };
  tempData: { [key: string]: item };
  length: number;
  desc: boolean;
  lastDate: number;
  limit: number;
  isAllItemDownloaded: boolean;
}

type Reducer = (state: TaskState, action: TaskAction) => TaskState;

const reducer: Reducer = (state = defaultState(), action) => {
  switch (action.type) {
    case authActions.SET_AUTHENTICATION_STATE: {
      return defaultState();
    }
    case taskActions.CLEAR_TASK: {
      return { ...state, data: null };
    }
    case taskActions.GET_TASK: {
      const { desc } = action;
      return { ...state, desc, isLoading: "all" };
    }
    case taskActions.GET_TASK_BY_ID: {
      const { id } = action;
      console.warn("getTaskById", id);
      return { ...state, isLoading: id };
    }
    case taskActions.SET_TASK: {
      const { data: newData } = action;
      const { data: oldData, limit } = state;
      const data = { ...oldData, ...newData };
      const newLength = from(newData).toArray().length;
      const length = from(data).toArray().length;
      return {
        ...state,
        isInit: true,
        isLoading: null,
        data,
        length,
        isAllItemDownloaded: newLength < limit,
        lastDate: new Date().getTime()
      };
    }
    case taskActions.SET_TASK_BY_ID: {
      const { data: newData } = action;
      let { data: oldData, tempData, limit } = state;
      const [id, data] = newData && from(newData).first();
      if (oldData && oldData[id]) {
        oldData = { ...oldData, [id]: data };
      }
      tempData = { ...tempData, [id]: data };

      return {
        ...state,
        isLoading: null,
        tempData,
        data: oldData,
        lastDate: new Date().getTime()
      };
    }
    case taskActions.SHOW_TASK_POPUP: {
      const { id } = action;
      let { data, tempData } = state;
      let newTemp;
      if (data && data[id]) {
        newTemp = { ...tempData, [id]: data[id] };
      }

      return {
        ...state,
        tempData: newTemp
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;

export type TaskAction =
  | GetTask
  | GetTaskById
  | SetTask
  | SetTaskById
  | ClearTask
  | ShowTaskPopUp
  | SetAuthenticationState;

export enum taskActions {
  CLEAR_TASK = "taskApp/taskAction/CLEAR_TASK",
  GET_TASK = "taskApp/taskAction/GET_TASK",
  GET_TASK_BY_ID = "taskApp/taskAction/GET_TASK_BY_ID",
  SET_TASK = "taskApp/taskAction/SET_TASK",
  SET_TASK_BY_ID = "taskApp/taskAction/SET_TASK_BY_ID",
  SHOW_TASK_POPUP = "taskApp/taskAction/SHOW_TASK_POPUP"
}

export interface ClearTask {
  type: taskActions.CLEAR_TASK;
}

export interface GetTaskById {
  type: taskActions.GET_TASK_BY_ID;
  id: string;
}

export interface ShowTaskPopUp {
  type: taskActions.SHOW_TASK_POPUP;
  id: string;
}

export interface GetTask {
  type: taskActions.GET_TASK;
  start: number;
  desc: boolean;
  limit: number;
}

export interface SetTask {
  type: taskActions.SET_TASK;
  data: { [key: string]: item };
}

export interface SetTaskById {
  type: taskActions.SET_TASK_BY_ID;
  data: { [key: string]: item };
}

export const showTaskPopUp = createAction<ShowTaskPopUp>(
  taskActions.SHOW_TASK_POPUP
);

export const clearTask = createAction<ClearTask>(taskActions.CLEAR_TASK);
export const getTask = createAction<GetTask>(taskActions.GET_TASK);
export const getTaskById = createAction<GetTaskById>(
  taskActions.GET_TASK_BY_ID
);
export const setTask = createAction<SetTask>(taskActions.SET_TASK);
export const setTaskById = createAction<SetTaskById>(
  taskActions.SET_TASK_BY_ID
);
