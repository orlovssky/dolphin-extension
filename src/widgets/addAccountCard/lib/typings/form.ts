import { ISelectedProxy, TProxyMode } from "./proxy";

export interface IForm {
  accountName: string;
  userAgent: string;
  tags: string[];
  sendCookies: boolean;
  proxyMode: TProxyMode;
  selectedProxy: ISelectedProxy | null;
  newProxy: string;
  newProxyName: string;
  changeIpUrl: string;
}
