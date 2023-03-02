import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SnackBar from "components/common/bars/SnackBar";
import AccountName from "components/main/cards/account/fields/AccountName";
import { MODES } from "components/main/cards/account/fields/proxy/fields/Mode";
import Proxy from "components/main/cards/account/fields/proxy/Proxy";
import Tags from "components/main/cards/account/fields/Tags";
import UserAgent from "components/main/cards/account/fields/UserAgent";
import WithCookies from "components/main/cards/account/fields/WithCookies";
import formLogic from "components/main/cards/account/form.logic";
import Card from "components/main/cards/Card";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IForm } from "types/main/account/form.types";

const Account = () => {
  const { t } = useTranslation();
  const formMethods = useForm<IForm>({
    defaultValues: {
      proxyMode: MODES.SELECT_PROXY,
    },
  });
  const { onSubmit, loading, snackBar, closeSnackBar } = formLogic({
    formMethods,
  });

  return (
    <>
      <SnackBar {...snackBar} onClose={closeSnackBar} />

      <Card titleNode="common.addAccount" cardProps={{ sx: { mb: 1 } }}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <UserAgent />
            <AccountName />
            <Proxy />
            <Tags />
            <WithCookies />

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                {t("common.add")}
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
      </Card>
    </>
  );
};

export default Account;
