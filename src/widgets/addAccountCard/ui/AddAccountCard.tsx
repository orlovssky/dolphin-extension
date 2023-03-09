/* eslint-disable max-lines */
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useAccessTokenStore } from "entities/facebookData/publicApi";
import { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card/publicApi";

import AccountName from "./AccountName";
import { TMode, MODES } from "./proxy/Mode";
import Proxy from "./proxy/Proxy";
import { ISelectedProxy } from "./proxy/SelectProxy";
import SendCookies from "./SendCookies";
import Tags from "./Tags";
import UserAgent from "./UserAgent";
import { getCookies } from "../lib/helpers/getCookies";
import parseProxy from "../lib/helpers/parseProxy";

import Cookie = chrome.cookies.Cookie;

export interface IForm {
  accountName: string;
  userAgent: string;
  tags: string[];
  sendCookies: boolean;
  proxyMode: TMode;
  selectedProxy: ISelectedProxy | null;
  newProxy: string;
  newProxyName: string;
  changeIpUrl: string;
}
interface IData {
  access_token: string;
  useragent: IForm["userAgent"];
  name: IForm["accountName"];
  tags: IForm["tags"];
  proxy?: ISelectedProxy;
  cookies: Cookie[] | null;
}
const AddAccountCard = () => {
  const { t } = useTranslation();
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const [loading, setLoading] = useState(false);
  const dolphinTokenData = useDolphinTokenData();
  const formMethods = useForm<IForm>({
    defaultValues: {
      proxyMode: MODES.SELECT_PROXY,
    },
  });
  const onSubmit = (form: IForm) => {
    let newProxy = null;

    if (form.proxyMode === MODES.NEW_PROXY) {
      newProxy = parseProxy(form.newProxy);

      if (newProxy instanceof Error) {
        return formMethods.setError("newProxy", {
          type: "validate",
          message: t("validation.required", {
            field: t(`proxy.${newProxy.message}`).toLowerCase(),
          }),
        });
      }
    }

    const data: IData = {
      access_token: accessToken,
      name: form.accountName,
      useragent: form.userAgent,
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

    if (form.sendCookies) {
      getCookies().then((cookies) => {
        addAccount({ ...data, cookies });
      });
    } else {
      addAccount(data);
    }
  };

  const addAccount = (data: IData) => {
    if (dolphinTokenData) {
      setLoading(true);
      const { host, authorization } = dolphinTokenData;
      axios
        .post(`${host}/accounts/add`, data, {
          headers: { Authorization: authorization },
        })
        .finally(() => {
          setLoading(false);
        })
        .then(({ data }) => {
          if (data.success) {
            openSnackBar({
              message: t("common.addAccountSuccess"),
              severity: "success",
            });
          } else {
            throw new Error("Not success");
          }
        })
        .catch(() => {
          openSnackBar({
            message: t("common.somethingWentWrong"),
            severity: "error",
          });
        });
    }
  };

  return (
    <Card title={t("common.addAccount")}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <AccountName />
          <UserAgent />
          <Proxy />
          <Tags />
          <SendCookies />

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              {t("common.add")}
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </Card>
  );
};

export default AddAccountCard;
