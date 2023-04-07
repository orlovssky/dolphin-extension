import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { useDolphinTokenData } from "entities/dolphinData";
import { useAccessTokenStore } from "entities/facebookData";
import { useSnackBarStore } from "entities/layout/snackBar";
import { useState } from "react";
import { FormProvider, UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card";

import AccountName from "./AccountName";
import Proxy from "./proxy/Proxy";
import SendCookies from "./SendCookies";
import Tags from "./Tags";
import UserAgent from "./UserAgent";
import addAccount from "../api/requests/addAccount";
import useAddAccount from "../lib/hooks/useAddAccount";
import emptyForm from "../lib/static/emptyForm";
import { IPostData } from "../lib/typings/account";
import { IForm } from "../lib/typings/form";

const AddAccountCard = () => {
  const { t } = useTranslation();
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const [loading, setLoading] = useState(false);
  const dolphinTokenData = useDolphinTokenData();
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleAddAccount = ({
    data,
    reset,
  }: {
    data: IPostData;
    reset: UseFormReset<IForm>;
  }) => {
    if (dolphinTokenData) {
      setLoading(true);

      addAccount({
        ...dolphinTokenData,
        data,
      })
        .then(() => {
          openSnackBar({
            message: t("common.addAccountSuccess"),
            severity: "success",
          });
          reset({
            ...structuredClone(emptyForm),
            userAgent: data.useragent,
          });
        })
        .catch(() => {
          openSnackBar({
            message: t("common.somethingWentWrong"),
            severity: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const { formMethods, onSubmit } = useAddAccount({
    addAccount: handleAddAccount,
  });

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
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!accessToken}
              loading={loading}
            >
              {t("common.add")}
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </Card>
  );
};

export default AddAccountCard;
