interface IProxy {
  id: number | null;
  name: string | null;
  type: "http" | "socks5";
  host: string;
  port: number;
  login: string | null;
  password: string | null;
  changeIpUrl: string | null;
}

const parseProxy = (proxyString: string): IProxy | null => {
  if (!proxyString.trim()) return null;

  const proxy: IProxy = {
    id: null,
    name: null,
    type: "http",
    host: "",
    port: 0,
    login: null,
    password: null,
    changeIpUrl: null,
  };
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

  console.log(proxy);

  if (!proxy.host || !proxy.port) return null;

  return proxy;
};

export default parseProxy;
