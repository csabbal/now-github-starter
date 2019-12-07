import React, { Component } from "react";
import { Tasks } from "../../../";
import moment from "moment";
import { LinkComponent } from "../../widgets/formComponents/Link";
import { Button } from "../../widgets/formComponents/Button";
import { isNil } from "ramda";

import "../../styles/taskListItem.scss";

type Props = Tasks.ListItem.Props;

export class TaskListItem extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  show = () => {
    this.props.show();
  };
  showDialog = () => {
    this.props.showDialog();
  };

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

  render() {
    return (
      <div
        className={
          "task_list_item_" +
          this.props.data.state +
          " task_list_item_container"
        }
      >
        <div className={"task_list_item_title"}>
          {this.props.data.name.toUpperCase()}
        </div>

        <span className={"task_list_item_description"}>
          {this.props.data.description}
        </span>

        <div
          className={"task_list_item_status status_" + this.props.data.state}
        >
          {this.getStatusText(this.props.data.state)}
        </div>

        <div className={"row_container"} style={{ marginTop: "10px" }}>
          <div className="button_container">
            <LinkComponent
              href={`/task/[id]`}
              as={`/task/${this.props.data.id}`}
              label={this.props.data.name}
            />
          </div>
          <Button
            style={{
              background: "#eee",
              borderRadius: 2,
              width: "auto",
              height: 30,
              color: "#222"
            }}
            onClick={() => this.showDialog()}
            label={"SHOW DIALOG"}
          />
        </div>
      </div>
    );
  }
}
