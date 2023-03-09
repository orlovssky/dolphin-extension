import { IProxy } from "../typings/proxy";

const emptyProxy: IProxy = {
  name: "",
  type: "http",
  host: "",
  port: 0,
  login: "",
  password: "",
  changeIpUrl: "",
};

const parseProxy = (proxyString: string): IProxy | Error => {
  const proxy: IProxy = { ...emptyProxy };
  let temporary = proxyString;
  let divided = temporary.split("://");

  if (divided.length > 1) {
    temporary = divided[0].toLowerCase();

    if (temporary === "https") {
      proxy.type = "http";
    } else if (temporary.startsWith("socks")) {
      proxy.type = "socks5";
    }

    temporary = divided[1];
  }

  if (temporary.search("@") > -1) {
    divided = temporary.split("@");

    const left = divided[0];
    const right = divided[1];

    divided = left.split(":");
    proxy.login = divided[0];
    proxy.password = divided[1];

    divided = right.split(":");
    proxy.host = divided[0];
    proxy.port = parseInt(divided[1], 10);
  } else {
    divided = temporary.split(":");

    if (divided.length === 2) {
      proxy.host = divided[0];
      proxy.port = parseInt(divided[1], 10);
    } else if (divided.length === 4) {
      proxy.host = divided[0];
      proxy.port = parseInt(divided[1], 10);
      proxy.login = divided[2];
      proxy.password = divided[3];
    }
  }

  if (!proxy.host) {
    return new Error("host");
  }

  if (!proxy.port) {
    return new Error("port");
  }

  return proxy;
};

export default parseProxy;
