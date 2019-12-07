import { from } from "fromfrom";
import { host, hasBackend } from "../config";
import { map, delay } from "rxjs/operators";
import { of } from "rxjs";
import { Task } from "../models/task";
import base64 from "base-64";
import basic from "./basic";
import tasks from "./test/tasks";

type getTask = Task.getTask;

async function getTaskRequest(start: number, limit: number, desc: boolean) {
  const userData = { start, limit, desc };
  let result: getTask = null;

  if (hasBackend) {
    const data = base64.encode(JSON.stringify(userData));
    const url = host.backendURL + "/getTask.php";
    result = await basic.request<getTask>(url, data);
  } else {
    result = await of(true)
      .pipe(
        delay(1000),
        map(() => {
          return {
            state: 200,
            tasks: from(tasks.tasks)
              .sortBy(it => it[1].updated)
              .toArray()
              .slice(start, start + limit)
              .reduce((acc, it) => {
                return { ...acc, [it[0]]: it[1] };
              }, {})
          };
        })
      )
      .toPromise();
    console.warn("getTaskRequest_result", result);
    return result;
  }
}

async function getTaskByIdRequest(id: string) {
  const userData = { id };
  let result: getTask = null;

  if (hasBackend) {
    const data = base64.encode(JSON.stringify(userData));
    const url = host.backendURL + "/getTaskById.php";
    result = await basic.request<getTask>(url, data);
  } else {
    result = await of(true)
      .pipe(
        delay(1000),
        map(() => {
          return {
            state: 200,
            tasks: { [id]: tasks.tasks[id] }
          };
        })
      )
      .toPromise();
    console.warn("getTaskByIdRequest_result", result);
    return result;
  }
}

export default { getTaskRequest, getTaskByIdRequest };
