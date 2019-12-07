import { Basic } from "./basic";

export namespace authentication {
  export interface LogIn extends Basic.Basic {
    user?: { id: string; name: string };
    isLoggedIn: boolean;
    error?: string;
  }
}
