import axios from "axios";
import { IDolphinTokenData } from "entities/dolphinData";

import { IPostData } from "../../lib/typings/account";

const addAccount = ({
  host,
  authorization,
  dolphinType,
  data,
}: IDolphinTokenData & { data: IPostData }) => {
  if (dolphinType === "cloud") {
    const newAccount = {
      access_token: data.access_token + "asd",
      name: data.name,
      user_agent: data.useragent,
      cookies: data.cookies ? JSON.stringify(data.cookies) : undefined,
      tags: data.tags,
      proxy_id: data.proxy && "id" in data.proxy ? data.proxy.id : undefined,
      proxy:
        data.proxy && !("id" in data.proxy)
          ? {
              type: data.proxy.type,
              host: data.proxy.ip,
              port: data.proxy.port,
              name: data.proxy.name,
              login: data.proxy.login,
              password: data.proxy.password,
              change_ip_url: data.proxy.change_ip_url,
            }
          : undefined,
    };

    return axios.post(
      `${host}/accounts`,
      { accounts: [newAccount] },
      {
        headers: { Authorization: authorization },
      }
    );
  } else {
    return axios
      .post(`${host}/accounts/add`, data, {
        headers: { Authorization: authorization },
      })
      .then(({ data: { success } }) => {
        if (!success) {
          throw new Error("Not success");
        }
      });
  }
};

export default addAccount;
