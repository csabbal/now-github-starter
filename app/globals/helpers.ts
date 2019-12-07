import Cookies from "universal-cookie";
import { dissoc } from "ramda";
import { Action } from "redux";

////////////////////////////////////////////////////////////////////////////////

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type ActionType<T, K extends keyof T> = T[K];

export function createAction<T extends Action>(type: ActionType<T, "type">) {
  return (params?: Omit<Partial<T>, "type">) => {
    return { type, ...dissoc("type", params) } as T;
  };
}

////////////////////////////////////////////////////////////////////////////////

export function setCookie(name, value) {
  let d = new Date();
  d.setTime(d.getTime() + 120 * 60 * 1000);
  const cookies = new Cookies();
  cookies.set(name, value, { path: "/", expires: d });
}
export function getCookie(name) {
  const cookies = new Cookies();
  const data = cookies.get(name);
  return data;
}

////////////////////////////////////////////////////////////////////////////////

export function _utf8_encode(string) {
  string = string.replace(/\r\n/g, "\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
}

// private method for UTF-8 decoding
export function _utf8_decode(utftext) {
  var string = "";
  var i = 0;
  var c = 0;
  var c2 = 0;
  var c3 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      i += 3;
    }
  }

  return string;
}
