import { Basic } from "./basic";

export namespace Task {
  export interface TaskItem {
    id: string;
    name: string;
    description: string;
    state: string;
    updated: Date;
  }

  export interface getTask extends Basic.Basic {
    tasks: { [key: string]: TaskItem };
  }
}
