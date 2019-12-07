import { createAction } from "../../globals/helpers";

export function defaultState(): RunTimeState {
  return { status: null, isInitialized: false, updated: 0 };
}

export interface RunTimeState {
  status: string;
  isInitialized: boolean;
  updated: number;
}

type Reducer = (state: RunTimeState, action: RunTimeAction) => RunTimeState;

const reducer: Reducer = (state = defaultState(), action) => {
  switch (action.type) {
    case runTimeActions.START: {
      return {
        ...state,
        status: "start",
        isInitialized: false,
        updated: new Date().getTime()
      };
    }
    case runTimeActions.INITIALIZED: {
      return {
        ...state,
        status: "initialized",
        isInitialized: true,
        updated: new Date().getTime()
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;

export type RunTimeAction = Start | Initialized;

export enum runTimeActions {
  START = "taskApp/runTimeAction/START",
  INITIALIZED = "taskApp/runTimeAction/INITIALIZED"
}

export interface Start {
  type: runTimeActions.START;
}

export interface Initialized {
  type: runTimeActions.INITIALIZED;
}

export const start = createAction<Start>(runTimeActions.START);

export const initialized = createAction<Initialized>(
  runTimeActions.INITIALIZED
);
