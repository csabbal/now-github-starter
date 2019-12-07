import React, { Component, Fragment } from "react";
import { Authentication } from "../..";
import { TextField, styled } from "@material-ui/core";
import { LoginTextField, Button } from "../widgets/formComponents";

type Props = Authentication.Login.Props;

type State = {
  name: string;
  pass: string;
};

export class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass: ""
    };
  }

  onChangeName = name => {
    this.setState({ name });
  };

  onChangePassword = pass => {
    this.setState({ pass });
  };
  login = () => {
    const { name, pass } = this.state;
    this.props.login(name, pass);
  };
  logout = () => {
    this.props.logout();
  };

  componentDidMount() {}

  componentDidUpdate() {}

  renderNotUserLoggedIn = () => (
    <div>
      <LoginTextField
        label={"User Name / Email"}
        value={this.state.name}
        onChange={text => this.onChangeName(text)}
      />
      <br />
      <LoginTextField
        label={"Password"}
        value={this.state.pass}
        onChange={text => this.onChangePassword(text)}
      />
      <br />
      <div className="text-center mt-4">
        <Button label={"LOGIN"} onClick={() => this.login()} />
      </div>
    </div>
  );

  renderUserLoggedIn = () => (
    <div className={"column_container"}>
      <p className={"general_font_style"}>{this.props.userName}</p>

      <div className="button_container">
        <Button
          style={{ background: "#d15151", width: 80, height: 25, fontSize: 10 }}
          label={"LOGOUT"}
          onClick={() => this.logout()}
        />
      </div>
    </div>
  );

  render() {
    return (
      <Fragment>
        {this.props.isLoggedIn && this.renderUserLoggedIn()}
        {!this.props.isLoggedIn && this.renderNotUserLoggedIn()}
      </Fragment>
    );
  }
}
