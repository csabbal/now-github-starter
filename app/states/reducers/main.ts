import { createAction } from "../../globals/helpers";
import { from } from "fromfrom";
import * as React from "react";

export function defaultState(): MainState {
  return { status: null, popups: {} };
}

export interface MainState {
  status: string;
  popups: { [key: string]: JSX.Element };
}

type Reducer = (state: MainState, action: MainAction) => MainState;

const reducer: Reducer = (state = defaultState(), action) => {
  switch (action.type) {
    case MainActions.SHOW_POPUP: {
      const { popups } = state;
      const { id, content } = action;
      return { ...state, popups: { ...popups, [id]: content } };
    }
    case MainActions.CLOSE_POPUP: {
      const { popups } = state;
      const { id } = action;

      const newPopUps = from(popups)
        .filter(([key, it]) => key != id)
        .reduce((acc, it) => {
          return { ...acc, [it[0]]: it[1] };
        }, {});

      return { ...state, popups: newPopUps };
    }
    default:
      return { ...state };
  }
};

export default reducer;

export type MainAction = ShowPopUp | ClosePopUp;

export enum MainActions {
  SHOW_POPUP = "taskApp/MainAction/SHOW_POPUP",
  CLOSE_POPUP = "taskApp/MainAction/CLOSE_POPUP"
}

export interface ShowPopUp {
  type: MainActions.SHOW_POPUP;
  id: string;
  content: JSX.Element;
}

export interface ClosePopUp {
  type: MainActions.CLOSE_POPUP;
  id: string;
}

export const showPopUp = createAction<ShowPopUp>(MainActions.SHOW_POPUP);
export const closePopUp = createAction<ClosePopUp>(MainActions.CLOSE_POPUP);
