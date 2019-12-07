import * as React from "react";
import { Task } from "./models/task";

export namespace Tasks {
  export namespace List {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      more(): void;
      show(key: string): void;
      showDialog(key: string): void;
    }

    interface StateProps {
      isLoading: boolean;
      isAllItemDownloaded: boolean;
      lastDate: number;
      data: { [key: string]: Task.TaskItem };
    }
  }
  export namespace ListItem {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      show(): void;
      showDialog(): void;
    }

    interface StateProps {
      data: Task.TaskItem;
    }
  }
  export namespace Item {
    type Props = ActionProps & StateProps;

    interface ActionProps {}

    interface StateProps {
      isLoading: boolean;
      data: Task.TaskItem;
    }
  }
}

export namespace Main {
  export namespace Main {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      Menu(): JSX.Element;
      LogInBox(): JSX.Element;
      closePopUp(id: string): void;
    }

    interface StateProps {
      status: string;
      isLoggedIn: boolean;
      userName: string;
      popups: { [key: string]: JSX.Element };
      children: JSX.Element;
    }
  }

  export namespace Indicator {
    type Props = ActionProps & StateProps;

    interface ActionProps {}

    interface StateProps {}
  }

  export namespace Menu {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      navigate(path: string): void;
    }

    interface StateProps {}
  }
}

export namespace Widget {
  interface PopUpProps {
    id: string;
    renderContent?: () => JSX.Element;
  }
}

export namespace Authentication {
  export namespace Profile {
    type Props = ActionProps & StateProps;

    interface ActionProps {}

    interface StateProps {
      userName: string;
    }
  }
  export namespace Login {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      login(name: string, pass: string): void;
      logout(): void;
    }

    interface StateProps {
      userName: string;
      isLoggedIn: boolean;
    }
  }

  export namespace Welcome {
    type Props = ActionProps & StateProps;

    interface ActionProps {
      logout(): void;
    }

    interface StateProps {
      isLoggedIn: boolean;
      userName: string;
    }
  }
}
