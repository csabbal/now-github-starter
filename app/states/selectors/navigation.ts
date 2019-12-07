import { AppState } from "..";

export const getCurrentPage = (state: AppState) => {
  const {
    navigation: { current }
  } = state;

  return {
    current
  };
};
