import React from "react";
import { MainContainer } from "../app/containers/Main";
import { TaskListContainer } from "../app/containers/TaskList";

export default () => {
  return (
    <MainContainer>
      <TaskListContainer />
    </MainContainer>
  );
};
