import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { useState } from "react";
import { FormProvider, UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card/publicApi";

import AccountName from "./AccountName";
import Proxy from "./proxy/Proxy";
import SendCookies from "./SendCookies";
import Tags from "./Tags";
import UserAgent from "./UserAgent";
import useAddAccount from "../lib/hooks/useAddAccount";
import emptyForm from "../lib/static/emptyForm";
import { IPostData } from "../lib/typings/account";
import { IForm } from "../lib/typings/form";

const AddAccountCard = () => {
  const { t } = useTranslation();
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const [loading, setLoading] = useState(false);
  const dolphinTokenData = useDolphinTokenData();
  const addAccount = ({
    data,
    reset,
  }: {
    data: IPostData;
    reset: UseFormReset<IForm>;
  }) => {
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
        .then(({ data: { success } }) => {
          if (success) {
            openSnackBar({
              message: t("common.addAccountSuccess"),
              severity: "success",
            });
            reset({
              ...structuredClone(emptyForm),
              userAgent: data.useragent,
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
  const { formMethods, onSubmit } = useAddAccount({ addAccount });

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
