import { TProxy } from "./proxy";

import Cookie = chrome.cookies.Cookie;

export interface IPostData {
  access_token: string;
  useragent: string;
  name: string;
  tags: string[];
  proxy?: TProxy;
  cookies: Cookie[] | null;
}
