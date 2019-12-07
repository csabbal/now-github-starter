import React, { Component } from "react";
import { Tasks } from "../../..";
import moment from "moment";
import { TaskListItem } from "./TaskListItem";
import { Loader } from "../../widgets/Loader";
import { Button } from "../../widgets/formComponents/Button";

import { from } from "fromfrom";
import { isNil } from "ramda";

type Props = Tasks.List.Props;

export class TaskList extends Component<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  more = () => {
    this.props.more();
  };
  show = (key: string) => {
    // this.props.show(key);
  };
  showDialog = (key: string) => {
    this.props.showDialog(key);
  };

  renderItems = () => {
    return from(this.props.data).map(([key, it]) => (
      <TaskListItem
        key={key}
        data={it}
        show={() => this.show(key)}
        showDialog={() => this.showDialog(key)}
      />
    ));
  };

  render() {
    const refreshTime = moment(new Date(this.props.lastDate))
      .format("YYYY.DD.MM h:mm:ss a")
      .toString();
    return (
      <div>
        <div className={"row_container"}>
          <span className={"general_title_font_style"}>{"TASKS"}</span>
          {!isNil(this.props.data) && (
            <span className={"general_font_style"} style={{ color: "#80aa36" }}>
              {refreshTime}
            </span>
          )}
        </div>
        {!isNil(this.props.data) && (
          <div>
            {this.props.data && this.renderItems()}

            {!this.props.isAllItemDownloaded && (
              <div
                className="button_container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Button
                  style={{
                    background: "#222",
                    borderRadius: 2,
                    width: "auto",
                    height: 20
                  }}
                  onClick={() => this.more()}
                  label={"MORE"}
                />
              </div>
            )}
          </div>
        )}
        {this.props.isLoading && <Loader />}
      </div>
    );
  }
}
