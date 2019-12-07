import React, { Component } from "react";
import { Tasks } from "../../..";
import moment from "moment";
import { isNil } from "ramda";
import { Loader } from "../../../components/widgets/Loader";

import "../../styles/taskItem.scss";

type Props = Tasks.Item.Props;

export class TaskItem extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "INPROGRESS";
      case "done":
        return "DONE";
      case "todo":
        return "TODO";
      case "test":
        return "TEST";
    }
  };

  renderData = () => {
    return (
      <div
        className={
          "task_item_" + this.props.data.state + " task_item_container"
        }
      >
        <div className={"task_item_title"}>
          {this.props.data.name.toUpperCase()}
        </div>

        <span className={"task_item_description"}>
          {this.props.data.description}
        </span>

        <div className={"task_item_status status_" + this.props.data.state}>
          {this.getStatusText(this.props.data.state)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.isLoading && <Loader />}
        {!isNil(this.props.data) && this.renderData()}
      </div>
    );
  }
}
