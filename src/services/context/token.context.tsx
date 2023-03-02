import axios from "axios";
import SnackBar from "components/common/bars/SnackBar";
import {
  useState,
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { ERRORS } from "services/constants/app/error.constants";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { extractData } from "services/utils/main/token/extractData.utils";
import { ITokenContext, TLoadProfile } from "types/main/token.types";

const emptyData = {
  username: "",
  host: "",
  authorization: "",
};
const TokenContext = createContext<ITokenContext | null>(null);

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [snackBarOpened, setSnackBarOpened] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ ...emptyData });
  const loadProfile: TLoadProfile = ({ dolphinToken, initial = false }) => {
    setIsConnected(false);
    setData({ ...emptyData });

    const tokenData = extractData(dolphinToken);

    if (!tokenData) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          errorCode: ERRORS.NO_TOKEN_DATA,
        });
      });
    }

    setLoading(true);

    return axios(`${tokenData.host}/profile`, {
      headers: { Authorization: tokenData.authorization },
    })
      .then(({ data }) => {
        if (!data.success) {
          throw new Error("Profile response not success");
        }

        setLoading(false);

        if (!initial) {
          chrome.storage.local
            .set({
              [LOCAL_STORAGE.DOLPHIN_TOKEN]: dolphinToken,
            })
            .then(() => {
              // do nothing.
            });
        }

        setIsConnected(true);
        setData({
          username: data.data.login,
          ...tokenData,
        });
        setSnackBarOpened(true);

        return {
          success: true,
        };
      })
      .catch(() => {
        setLoading(false);

        return {
          success: false,
        };
      });
  };

  const contextValue: ITokenContext = useMemo(
    () => ({
      isConnected,
      loading,
      data,
      loadProfile,
    }),
    [isConnected, loading, data]
  );

  useEffect(() => {
    chrome.storage.local.get([LOCAL_STORAGE.DOLPHIN_TOKEN]).then((result) => {
      const storedDolphinToken = result[LOCAL_STORAGE.DOLPHIN_TOKEN];

      if (storedDolphinToken) {
        loadProfile({ dolphinToken: storedDolphinToken, initial: true }).then(
          () => {
            // do nothing.
          }
        );
      }
    });
  }, []);

  return (
    <TokenContext.Provider value={contextValue}>
      <>
        <SnackBar
          text={t("dolphin.connectionEstablished")}
          isOpened={snackBarOpened}
          onClose={() => {
            setSnackBarOpened(false);
          }}
        />

        {children}
      </>
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);

export default TokenProvider;
