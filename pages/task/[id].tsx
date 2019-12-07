import React from "react";
import { MainContainer } from "../../app/containers/Main";
import { TaskItemContainer } from "../../app/containers/TaskItem";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  console.warn("router", router);

  return (
    <MainContainer>
      <TaskItemContainer id={null} />
    </MainContainer>
  );
};
