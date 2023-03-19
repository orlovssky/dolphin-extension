import PROXY_MODES from "../constants/PROXY_MODES";

export default {
  accountName: "",
  userAgent: "",
  tags: [],
  sendCookies: false,
  proxyMode: PROXY_MODES.SELECT_PROXY,
  selectedProxy: null,
  newProxy: "",
  newProxyName: "",
  withChangeIpUrl: false,
  changeIpUrl: "",
};
