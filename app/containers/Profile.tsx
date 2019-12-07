import { connect } from "react-redux";
import * as Pages from "../../components/pages";
import { AppState } from "../states";
import { logIn, logOut } from "../states/reducers/authentication";
import { LoginContainer } from "./Login";
import { Authentication } from "../..";
import React from "react";

export const ProfileContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props) => profileSelector(state, dispatch, props)
)(Pages.Profile);

function profileSelector(
  ...params: [AppState, Function, any]
): Authentication.Profile.Props {
  const [state, dispatch] = params;

  const {
    authentication: { userName }
  } = state;

  return {
    userName
  };
}
