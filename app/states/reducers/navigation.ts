import { createAction } from "../../globals/helpers";

type Location = { pathname: string; query: { [key: string]: string } };

function defaultState(): NavigationState {
  return {
    current: null,
    previous: null
  };
}

export interface NavigationState {
  previous: Location;
  current: Location;
}

type Reducer = (
  state: NavigationState,
  action: NavigationAction
) => NavigationState;

const reducer: Reducer = (state = defaultState(), action) => {
  switch (action.type) {
    case navigationActions.CHANGE_LOCATION:
      const previous = state.current;
      const current = action.location;

      return { ...state, current, previous };
    default:
      return { ...state };
  }
};

export default reducer;

export type NavigationAction = Navigate | ChangeLocation;

export enum navigationActions {
  NAVIGATE = "taskApp/navigationAction/NAVIGATE",
  CHANGE_LOCATION = "taskApp/navigationAction/CHANGE_LOCATION"
}

export interface Navigate {
  type: navigationActions.NAVIGATE;
  location: string;
}

export interface ChangeLocation {
  type: navigationActions.CHANGE_LOCATION;
  location: { pathname: string; query: {} };
}

export const navigate = createAction<Navigate>(navigationActions.NAVIGATE);
export const changeLocation = createAction<ChangeLocation>(
  navigationActions.CHANGE_LOCATION
);
