import { connect } from "react-redux";
import * as Pages from "../../components/pages";
import { AppState } from "../states";
import { closePopUp } from "../states/reducers/main";
import { LoginContainer } from "./Login";
import { MenuContainer } from "./Menu";
import { Main } from "../..";
import React from "react";

export const MainContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props) => mainSelector(state, dispatch, props)
)(Pages.Main);

function mainSelector(...params: [AppState, Function, any]): Main.Main.Props {
  const [state, dispatch, props] = params;

  const {
    runTime: { status, isInitialized },
    authentication: { userName, isLoggedIn },
    main: { popups }
  } = state;

  return {
    status,
    isLoggedIn,
    userName,
    popups,
    children: props.children,
    LogInBox: () => <LoginContainer />,
    Menu: () => <MenuContainer />,
    closePopUp: (id: string) => {
      dispatch(closePopUp({ id }));
    }
  };
}
