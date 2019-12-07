import React, { Component } from "react";
import { Main } from "../..";
import { Button } from "../widgets/formComponents/Button";
import { LinkComponent } from "../widgets/formComponents/Link";

import "../styles/menu.scss";

type Props = Main.Menu.Props;

export class Menu extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  navigate = (path: string) => {
    this.props.navigate(path);
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div id="menu_container">
        <div className="button_container">
          <LinkComponent href="/tasks" label="TASKS" />
        </div>
        <div className="button_container">
          <LinkComponent href="/profile" label="PROFILE" />
        </div>
      </div>
    );
  }
}
