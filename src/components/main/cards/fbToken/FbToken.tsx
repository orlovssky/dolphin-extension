import Alert from "@mui/material/Alert";
import Card from "components/main/cards/Card";
import { useTranslation } from "react-i18next";

const FbToken = () => {
  const { t } = useTranslation();

  return (
    <Card titleNode="common.fb.token" cardProps={{ sx: { mb: 1 } }}>
      <Alert severity="error">{t("common.fb.tokenNotFound")}</Alert>
    </Card>
  );
};

export default FbToken;
