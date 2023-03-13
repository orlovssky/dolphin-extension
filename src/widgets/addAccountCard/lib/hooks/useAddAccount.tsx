import { useAccessTokenStore } from "entities/facebookData/publicApi";
import { useForm, UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";

import PROXY_MODES from "../constants/PROXY_MODES";
import { getCookies } from "../helpers/getCookies";
import parseProxy from "../helpers/parseProxy";
import emptyForm from "../static/emptyForm";
import { IPostData } from "../typings/account";
import { IForm } from "../typings/form";

const useAddAccount = ({
  addAccount,
}: {
  addAccount: ({
    data,
    reset,
  }: {
    data: IPostData;
    reset: UseFormReset<IForm>;
  }) => void;
}) => {
  const { t } = useTranslation();
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const formMethods = useForm<IForm>({
    defaultValues: structuredClone(emptyForm),
  });
  const onSubmit = (form: IForm) => {
    console.log(form);
    const data: IPostData = {
      access_token: accessToken,
      name: form.accountName,
      useragent: form.userAgent,
      tags: form.tags,
      cookies: null,
    };

    if (form.proxyMode === PROXY_MODES.NEW_PROXY) {
      const newProxy = parseProxy(form.newProxy);

      if (newProxy instanceof Error) {
        return formMethods.setError("newProxy", {
          type: "validate",
          message: t("validation.required", {
            field: t(`proxy.${newProxy.message}`).toLowerCase(),
          }),
        });
      }

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

    if (form.proxyMode === PROXY_MODES.SELECT_PROXY && form.selectedProxy) {
      data.proxy = form.selectedProxy;
    }

    if (form.sendCookies) {
      getCookies().then((cookies) => {
        addAccount({
          data: { ...data, cookies },
          reset: formMethods.reset,
        });
      });
    } else {
      addAccount({
        data,
        reset: formMethods.reset,
      });
    }
  };

  return {
    formMethods,
    onSubmit,
  };
};

export default useAddAccount;
