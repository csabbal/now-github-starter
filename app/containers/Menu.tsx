import { connect } from "react-redux";
import * as Sections from "../../components/sections";
import { AppState } from "../states";
import { Main } from "../..";
import { navigate } from "../states/reducers/navigation";

export const MenuContainer = connect(
  (state: AppState) => ({ state }),
  (dispatch: Function) => ({ dispatch }),
  ({ state }, { dispatch }, props) => menuSelector(state, dispatch, props)
)(Sections.Menu);

function menuSelector(...params: [AppState, Function, any]): Main.Menu.Props {
  const [state, dispatch] = params;

  return {
    navigate: (location: string) => {
      dispatch(navigate({ location }));
    }
  };
}
