import React, { Component } from "react";

export class Loader extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="loaderContainer">
        <span className="sr-only">{"Loading..."}</span>
      </div>
    );
  }
}
