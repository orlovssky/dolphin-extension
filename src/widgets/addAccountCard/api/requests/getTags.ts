import axios from "axios";
import { IDolphinTokenData } from "entities/dolphinData";

const getTags = ({
  host,
  authorization,
  dolphinType,
  search,
}: IDolphinTokenData & { search?: string }): Promise<string[]> => {
  if (dolphinType === "cloud") {
    let url = `${host}/tags?entity_type=accounts&perPage=100`;

    if (search?.trim()) {
      url += `&q=${search}`;
    }

    return axios<{ data: { name: string }[] }>(url, {
      headers: { Authorization: authorization },
    }).then(({ data: { data } }) => {
      if (Array.isArray(data)) {
        return data.map(({ name }) => name);
      } else {
        throw new Error("No tags");
      }
    });
  } else {
    return axios<{ data: string[]; success: boolean }>(
      `${host}/tags?only_from=accounts`,
      {
        headers: { Authorization: authorization },
      }
    ).then(({ data: { data, success } }) => {
      if (success && Array.isArray(data)) {
        return data;
      } else {
        throw new Error("No tags");
      }
    });
  }
};

export default getTags;
