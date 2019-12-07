import { connect } from "react-redux";
import * as Pages from "../../components/pages";
import { AppState } from "../states";
import { logIn, logOut } from "../states/reducers/authentication";
import { Authentication } from "../..";

export const LoginContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props) => loginSelector(state, dispatch, props)
)(Pages.Login);

function loginSelector(
  ...params: [AppState, Function, any]
): Authentication.Login.Props {
  const [state, dispatch] = params;

  const { isLoggedIn, userName, userId } = state.authentication;

  return {
    userName,
    isLoggedIn,
    login: (name, pass) => {
      dispatch(logIn({ name, pass }));
    },
    logout: () => {
      dispatch(logOut({ id: userId }));
    }
  };
}
