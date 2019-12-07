import { authentication } from "../models/authentication";
import { getCookie } from "../app/globals/helpers";
import { host, hasBackend } from "../config";
import { isEmpty } from "ramda";
import base64 from "base-64";
import basic from "./basic";
import md5 from "md5";

type LogIn = authentication.LogIn;

async function logInRequest(name: string, pass: string) {
  const userData = { name: name, password: md5(pass) };
  let result: LogIn = null;

  if (hasBackend) {
    const data = base64.encode(JSON.stringify(userData));
    const url = host.backendURL + "/login.php";
    result = await basic.request<LogIn>(url, data);
  } else {
    result = {
      state: 200,
      user: { id: getCookie("userId"), name },
      isLoggedIn: true
    };
  }
  console.warn("loginRequest_result", result);
  return result;
}

async function logOutRequest(id: string) {
  const userData = { id };
  let result: LogIn = null;

  if (hasBackend) {
    const data = base64.encode(JSON.stringify(userData));
    const url = host.backendURL + "/logOut.php";
    result = await basic.request<LogIn>(url, data);
  } else {
    result = { state: 200, isLoggedIn: false };
  }
  console.warn("logOutRequest_result", result);
  return result;
}

async function getAuthenticationStateRequest(id: string) {
  const userData = { id };
  let result: LogIn = null;

  const name = getCookie("userName");
  const isLoggedIn = !isEmpty(name);

  if (hasBackend) {
    const data = base64.encode(JSON.stringify(userData));
    const url = host.backendURL + "/getAuthenticationState.php";
    result = await basic.request<LogIn>(url, data);
  } else {
    result = {
      state: 200,
      user: { id: "456tyrhtger6u45etrg", name },
      isLoggedIn
    };
  }
  console.warn("getAuthenticationStateRequest_result", result);
  return result;
}

export default { logInRequest, logOutRequest, getAuthenticationStateRequest };
