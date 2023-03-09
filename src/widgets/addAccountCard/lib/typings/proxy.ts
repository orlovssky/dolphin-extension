import MODES from "../constants/PROXY_MODES";

export type TProxyMode = (typeof MODES)[keyof typeof MODES];

export interface IProxy {
  name: string;
  type: "http" | "socks5";
  host: string;
  port: number;
  login: string;
  password: string;
  changeIpUrl: string;
}

export interface ISelectedProxy {
  id: number;
  name: string;
  type: string;
  ip: string;
  port: number;
  login: string;
  password: string;
  change_ip_url: string;
}
interface INewProxy {
  name: string;
  type: string;
  ip: string;
  port: number;
  login: string;
  password: string;
  change_ip_url: string;
}

export type TProxy = ISelectedProxy | INewProxy;
