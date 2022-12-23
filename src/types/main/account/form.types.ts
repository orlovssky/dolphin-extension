import { MODES } from "components/main/cards/account/fields/proxy/fields/Mode";
import { ISelectedProxy } from "types/main/account/proxy.types";

export interface IForm {
  userAgent: string;
  accountName: string;
  tags: string[];
  withCookies: boolean;
  proxyMode: MODES;
  selectedProxy: ISelectedProxy | null;
  newProxy: string;
  newProxyName: string;
  changeIpUrl: string;
}
