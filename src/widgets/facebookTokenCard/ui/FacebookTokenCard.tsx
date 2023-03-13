import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import {
  extractAccessToken,
  useAccessTokenStore,
} from "entities/facebookData/publicApi";
import { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card/publicApi";

const FacebookTokenCard = () => {
  const { t } = useTranslation();
  const { accessToken, setAccessToken } = useAccessTokenStore((state) => state);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);

  const handleClick = () => {
    navigator.clipboard.writeText(accessToken).then(() => {
      openSnackBar({ message: t("common.copied"), severity: "success" });
    });
  };

  useEffect(() => {
    extractAccessToken().then((accessToken) => {
      setAccessToken(accessToken);
    });
  }, []);

  return (
    <Card
      title={t("facebook.token")}
      cardProps={{ sx: { mb: 1 }, variant: "elevation" }}
    >
      {!accessToken && (
        <Alert severity="error">{t("facebook.tokenNotFound")}</Alert>
      )}

      {Boolean(accessToken) && (
        <Alert
          severity="success"
          action={
            <IconButton color="success" size="small" onClick={handleClick}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          }
        >
          {accessToken}
        </Alert>
      )}
    </Card>
  );
};

export default FacebookTokenCard;
