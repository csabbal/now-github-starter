import { AppState } from "..";
import { TaskState } from "../reducers/task";
import { Task } from "../../../models/task";

type item = Task.TaskItem;

export const getTaskOptions = (state: AppState) => {
  const {
    task: { limit, desc, isInit, isAllItemDownloaded, isLoading, length }
  } = state;

  return {
    limit,
    desc,
    isInit,
    isAllItemDownloaded,
    isLoading,
    length
  } as Partial<TaskState>;
};

export const getTasks = (state: AppState) => {
  const {
    task: { data }
  } = state;

  return {
    data
  } as { data: { [key: string]: item } };
};
