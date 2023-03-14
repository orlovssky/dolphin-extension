import getAntyApiToken from "./getAntyApiToken";
import getAntyApiVersion from "./getAntyApiVersion";
import getAntyBaseUrl from "./getAntyBaseUrl";
import getAntyProfileID from "./getAntyProfileID";

const getAntyData = (): Promise<{
  id: string;
  baseUrl: string;
  apiToken: string;
  apiVersion: string;
}> => {
  return new Promise((resolve, reject) => {
    getAntyProfileID().then((id) => {
      if (id) {
        getAntyBaseUrl().then((baseUrl) => {
          if (baseUrl) {
            getAntyApiToken().then((apiToken) => {
              if (apiToken) {
                getAntyApiVersion().then((apiVersion) => {
                  if (apiVersion) {
                    resolve({
                      id,
                      baseUrl,
                      apiToken,
                      apiVersion,
                    });
                  } else {
                    reject("No Anty Api Version");
                  }
                });
              } else {
                reject("No Anty Api Token");
              }
            });
          } else {
            reject("No Anty Base Url");
          }
        });
      } else {
        reject("No Anty Profile ID");
      }
    });
  });
};

export default getAntyData;
