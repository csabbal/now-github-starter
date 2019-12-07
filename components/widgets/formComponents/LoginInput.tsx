import React, { Component } from "react";
import { styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

type Props = {
  label: string;
  value: string;
  onChange(value: string): void;
};

type State = {
  value: string;
};

export class LoginTextField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  onChangeValue = (value: string) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div className={"login_text_field text_field_container"}>
        <TextField
          label={this.props.label}
          autoComplete="off"
          onChange={element => this.onChangeValue(element.target.value)}
          value={this.props.value}
        />
      </div>
    );
  }
}
