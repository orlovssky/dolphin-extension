import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "components/main/cards/Card";
import AccountName from "components/main/cards/account/AccountName";
import Tags from "components/main/cards/account/Tags";
import UserAgent from "components/main/cards/account/UserAgent";
import WithCookies from "components/main/cards/account/WithCookies";
import useFormLogic from "components/main/cards/account/form";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const {
    registeredUserAgent,
    registeredAccountName,
    control,
    errors,
    handleSubmit,
    onSubmit,
  } = useFormLogic();

  return (
    <Card titleNode="common.addAccount" cardProps={{ sx: { mb: 1 } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserAgent
          formRegister={registeredUserAgent}
          error={errors?.userAgent}
        />
        <AccountName
          formRegister={registeredAccountName}
          error={errors?.accountName}
        />
        <Tags control={control} />
        <WithCookies control={control} />

        <Box sx={{ textAlign: "center", mt: 1 }}>
          <LoadingButton type="submit" variant="contained">
            {t("common.add")}
          </LoadingButton>
        </Box>
      </form>
    </Card>
  );
};

export default Account;
