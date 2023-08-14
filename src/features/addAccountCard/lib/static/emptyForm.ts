import PROXY_MODE from '../constants/PROXY_MODE'

export default {
  accountName: '',
  userAgent: '',
  tags: [],
  sendCookies: true,
  proxyMode: PROXY_MODE.SELECT_PROXY,
  selectedProxy: null,
  newProxy: '',
  newProxyName: '',
  withChangeIpUrl: false,
  changeIpUrl: '',
}
