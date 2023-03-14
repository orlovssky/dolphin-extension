import axios from "axios";

import useAntyProfileStore from "../../model/store/useAntyProfileStore";
import getAntyData from "../helpers/getAntyData";
import { IResponseProfile } from "../typings/antyProfile";

const useProfile = () => {
  const setProfile = useAntyProfileStore((state) => state.setProfile);

  return () => {
    return getAntyData().then(({ id, baseUrl, apiToken, apiVersion }) => {
      return axios<IResponseProfile>(`${baseUrl}/browser_profiles/${id}`, {
        headers: {
          Authorization: apiToken,
          "X-Anty-App-Version": apiVersion,
        },
      }).then(({ data }) => {
        setProfile(data.data);
      });
    });
  };
};

export default useProfile;
