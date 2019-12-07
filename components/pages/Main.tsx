import React, { Fragment } from "react";
import { Component } from "react";
import { Main as MainType } from "../..";
import Modal from "react-awesome-modal";
import { from } from "fromfrom";

import "../styles/main.scss";

type Props = MainType.Main.Props;

type State = {
  popups: { [key: string]: { content: JSX.Element; isOpen: boolean } };
};

export class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { popups: {} };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const popups = from(props.popups)
      .filter(it => !!it)
      .reduce((acc, [id, content]) => {
        return {
          ...acc,
          [id]: { content, isOpen: true }
        };
      }, {});

    return { popups };
  }

  handleCloseModal(id: string) {
    this.props.closePopUp(id);
  }

  renderPopUps = () => {
    const modals = from(this.state.popups)
      .filter(it => !!it)
      .map(([id, { content, isOpen }]) => this.addPopUp(id, content, isOpen))
      .toArray();

    return modals;
  };

  addPopUp = (id: string, content: JSX.Element, isOpen: boolean) => {
    return (
      <Modal
        key={id}
        visible={isOpen}
        width="400"
        height="300"
        effect="fadeInDown"
        onClickAway={() => this.handleCloseModal(id)}
      >
        {content}
      </Modal>
    );
  };

  componentDidMount() {}

  componentDidUpdate() {}

  renderLoginBox = () => (
    <div id="main_login_container">{this.props.LogInBox()}</div>
  );
  renderMenu = () => <div>{this.props.Menu()}</div>;

  renderHeader = () => {
    return (
      <div id="main_header_container">
        <div className="logo_container"></div>
        {this.renderLoginBox()}
      </div>
    );
  };

  renderBody = () => {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.renderMenu()}
          <div>{this.props.children}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  renderAfterInitialized() {
    return (
      <Fragment>
        {this.renderHeader()}
        <div className={"body_container"}>{this.renderBody()}</div>
        {this.renderPopUps()}
      </Fragment>
    );
  }

  render() {
    return (
      <div id="main_container">
        {this.props.status == "initialized"
          ? this.renderAfterInitialized()
          : null}
      </div>
    );
  }
}
