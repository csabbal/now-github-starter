import { createAction } from "../../globals/helpers";

export function defaultState(): AuthState {
  return { userName: null, userId: null, isLoggedIn: false, authError: null };
}

export interface AuthState {
  userName: string;
  userId: string;
  isLoggedIn: boolean;
  authError: string;
}

type Reducer = (state: AuthState, action: AuthAction) => AuthState;

const reducer: Reducer = (state = defaultState(), action) => {
  switch (action.type) {
    case authActions.SET_AUTHENTICATION_STATE: {
      const { isLoggedIn, userName, userId } = action;
      return { ...state, userName, userId, isLoggedIn };
    }
    default:
      return { ...state };
  }
};

export default reducer;

export type AuthAction = LogIn | LogOut | SetAuthenticationState;

export enum authActions {
  LOGIN = "taskApp/authAction/LOGIN",
  LOGOUT = "taskApp/authAction/LOGOUT",
  SET_AUTHENTICATION_STATE = "taskApp/authAction/SET_AUTHENTICATION_STATE",
  GET_AUTHENTICATION_STATE = "taskApp/authAction/GET_AUTHENTICATION_STATE"
}

export interface SetAuthenticationState {
  type: authActions.SET_AUTHENTICATION_STATE;
  userName: string;
  userId: string;
  isLoggedIn: boolean;
  error?: string;
}

export interface GetAuthenticationState {
  type: authActions.GET_AUTHENTICATION_STATE;
}

export interface LogIn {
  type: authActions.LOGIN;
  name: string;
  pass: string;
}

export interface LogOut {
  type: authActions.LOGOUT;
  id: string;
}

export const logIn = createAction<LogIn>(authActions.LOGIN);

export const logOut = createAction<LogOut>(authActions.LOGOUT);

export const setAuthenticationState = createAction<SetAuthenticationState>(
  authActions.SET_AUTHENTICATION_STATE
);
export const getAuthenticationState = createAction<GetAuthenticationState>(
  authActions.GET_AUTHENTICATION_STATE
);
