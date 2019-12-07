import React, { Component } from "react";
import { Authentication } from "../../";

type Props = Authentication.Profile.Props;

export class Profile extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h2>{"Profile"}</h2>
      </div>
    );
  }
}
