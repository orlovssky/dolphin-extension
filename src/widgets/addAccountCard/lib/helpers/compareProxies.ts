import { IAntyProxy } from "entities/antyData";

import { ISelectedProxy } from "../typings/proxy";

const compareProxies = (proxy: ISelectedProxy, antyProxy: IAntyProxy) => {
  const { type, host, port, changeIpUrl } = antyProxy;

  if (
    proxy.type === type &&
    proxy.ip === host &&
    proxy.port.toString() === port.toString() &&
    proxy.change_ip_url === changeIpUrl
  ) {
    if (
      (proxy.login &&
        antyProxy.login &&
        proxy.login.toString() === antyProxy.login.toString()) ||
      (!proxy.login && !antyProxy.login)
    ) {
      if (
        (proxy.password &&
          antyProxy.password &&
          proxy.password.toString() === antyProxy.password.toString()) ||
        (!proxy.password && !antyProxy.password)
      ) {
        return true;
      }
    }
  }

  return false;
};

export default compareProxies;
