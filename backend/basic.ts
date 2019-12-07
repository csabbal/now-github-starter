import axios from "axios";
async function request<OutputType>(
  url: string,
  data: string,
  addedHeaders?: { [key: string]: string }
) {
  let headers = {
    "Content-Type": "application/json",
    ...addedHeaders
  };
  let result: OutputType = null;
  await axios
    .post(url, { data }, { headers })
    .then(response => {
      result = response.data;
    })
    .catch(error => {
      throw new TaskAppError("error", error);
    });

  return result;
}

class TaskAppError extends Error {
  public readonly response: Error;
  constructor(message: string, response: Error) {
    super(message);
    this.name = "TaskAppError";
    this.response = response;
  }
}

export default { request, TaskAppError };
