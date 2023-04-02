import axios from "axios";
import { IDolphinTokenData } from "entities/dolphinData/publicApi";

import { ISelectedProxy, ICloudProxy } from "../../lib/typings/proxy";

const getProxies = ({
  host,
  authorization,
  dolphinType,
  search,
}: IDolphinTokenData & { search?: string }): Promise<ISelectedProxy[]> => {
  if (dolphinType === "cloud") {
    let url = `${host}/proxies?platform=FB&perPage=100`;

    if (search?.trim()) {
      url += `&q=${search}`;
    }

    return axios<{ data: ICloudProxy[] }>(url, {
      headers: { Authorization: authorization },
    }).then(({ data: { data } }) => {
      if (Array.isArray(data)) {
        return data.map((element) => ({
          id: element.id,
          name: element.name,
          type: element.type,
          ip: element.host,
          port: +element.port,
          login: element.login,
          password: element.password,
          change_ip_url: element.change_ip_url,
        }));
      } else {
        throw new Error("No proxies");
      }
    });
  } else {
    return axios<{ data: ISelectedProxy[]; success: boolean }>(
      `${host}/proxy`,
      {
        headers: { Authorization: authorization },
      }
    ).then(({ data: { data, success } }) => {
      if (success && Array.isArray(data)) {
        return data;
      } else {
        throw new Error("No proxies");
      }
    });
  }
};

export default getProxies;
