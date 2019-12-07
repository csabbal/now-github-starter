import React, { Component } from "react";
import { Fab, Button as MaterialButton } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";

type ButtonStyle = {
  background: string;
  borderRadius: number;
  boxShadow: string;
  color: string;
  height: number;
  width: number | string;
  fontSize: number;
  padding: string;
  margin: string;
};

type Props = {
  style?: Partial<ButtonStyle>;
  label: string;
  onClick(): void;
};

const defaultButtonProps = {
  background: "#80aa36",
  border: 0,
  borderRadius: 25,
  boxShadow: "0 1px 2px 2px rgba(0, 0, 0, .1)",
  color: "white",
  height: 40,
  width: 240,
  fontSize: 10,
  padding: "0 30px",
  margin: "0px 5px 0px 0px"
} as ButtonStyle;

export class Button extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.onClick();
  };

  render() {
    const CustomButton = styled(MaterialButton)({
      ...defaultButtonProps,
      ...this.props.style
    });

    return (
      <div>
        <CustomButton onClick={() => this.onClick()}>
          {this.props.label}
        </CustomButton>
      </div>
    );
  }
}
