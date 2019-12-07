import React, { Component } from "react";
import { Fab, Button as MaterialButton } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

type LinkStyle = {
  background: string;
  borderRadius: number;
  boxShadow: string;
  color: string;
  height: number;
  width: number | string;
  fontSize: number;
  padding: string;
};

type Props = {
  style?: Partial<LinkStyle>;
  label: string;
  href: string;
  as?: string;
};

const defaultButtonProps = {
  background: "#80aa36",
  border: 0,
  borderRadius: 2,
  boxShadow: "0 1px 2px 2px rgba(0, 0, 0, .1)",
  color: "white",
  height: 30,
  width: "auto",
  fontSize: 10,
  padding: "0 20px",
  margin: "0px 5px 0px 0px"
} as LinkStyle;

export class LinkComponent extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const CustomButton = styled(MaterialButton)({
      ...defaultButtonProps,
      ...this.props.style
    });

    return (
      <Link href={this.props.href} as={this.props.as}>
        <a>{this.props.label}</a>
      </Link>
    );
  }
}
