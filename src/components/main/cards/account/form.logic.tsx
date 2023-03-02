import { AlertColor } from "@mui/material/Alert/Alert";
import axios from "axios";
import { MODES } from "components/main/cards/account/fields/proxy/fields/Mode";
import { useState } from "react";
import { Message, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFbTokenContext } from "services/context/fbToken.context";
import { useTokenContext } from "services/context/token.context";
import { getCookies } from "services/utils/browser/cookies.utils";
import parseProxy from "services/utils/main/proxy/parseProxy.utils";
import { IForm } from "types/main/account/form.types";
import { ISelectedProxy } from "types/main/account/proxy.types";

import Cookie = chrome.cookies.Cookie;

interface IData {
  access_token: string;
  useragent: IForm["userAgent"];
  name: IForm["accountName"];
  tags: IForm["tags"];
  proxy?: ISelectedProxy;
  cookies: Cookie[] | null;
}

interface ISnackBar {
  text: string;
  severity: AlertColor;
  isOpened: boolean;
}

const formLogic = ({ formMethods }: { formMethods: UseFormReturn<IForm> }) => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
  const fbToken = useFbTokenContext();
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    text: "",
    severity: "success",
    isOpened: false,
  });
  const onSubmit = (form: IForm) => {
    let newProxy = null;

    if (form.proxyMode === MODES.NEW_PROXY) {
      newProxy = parseProxy(form.newProxy);

      if (!newProxy) {
        formMethods.setError("newProxy", {
          type: "validate",
          message: t("validation.regex", {
            field: t("common.proxy.proxy").toLowerCase(),
          }) as Message,
        });

        return;
      }
    }

    const data: IData = {
      access_token: fbToken,
      useragent: form.userAgent,
      name: form.accountName,
      tags: form.tags,
      cookies: null,
    };

    if (form.selectedProxy) {
      data.proxy = form.selectedProxy;
    } else if (newProxy) {
      data.proxy = {
        name: form.newProxyName,
        type: newProxy.type,
        ip: newProxy.host,
        port: newProxy.port,
        login: newProxy.login,
        password: newProxy.password,
        change_ip_url: form.changeIpUrl,
      };
    }

    if (form.withCookies) {
      getCookies().then((cookies) => {
        addAccount({
          ...data,
          cookies,
        });
      });
    } else {
      addAccount(data);
    }
  };

  const addAccount = (data: IData) => {
    if (!tokenContext) return;

    const { data: tokenData } = tokenContext;

    setLoading(true);
    axios
      .post(`${tokenData.host}/accounts/add`, data, {
        headers: { Authorization: tokenData.authorization },
      })
      .finally(() => {
        setLoading(false);
      })
      .then(({ data }) => {
        if (data.success && Array.isArray(data.data)) {
          setSnackBar({
            text: t("common.addAccountSuccess"),
            severity: "success",
            isOpened: true,
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setSnackBar({
          text: t("common.somethingWentWrong"),
          severity: "error",
          isOpened: true,
        });
      });
  };

  return {
    loading,
    onSubmit,
    snackBar,
    closeSnackBar: () => {
      setSnackBar({
        ...snackBar,
        isOpened: false,
      });
    },
  };
};

export default formLogic;
