import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import SnackBar from "components/common/bars/SnackBar";
import Card from "components/main/cards/Card";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFbTokenContext } from "services/context/fbToken.context";

const FbToken = () => {
  const { t } = useTranslation();
  const fbToken = useFbTokenContext();
  const [snackBarOpened, setSnackBarOpened] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(fbToken).then(() => {
      setSnackBarOpened(true);
    });
  };

  return (
    <Card titleNode="fb.token" cardProps={{ sx: { mb: 1 } }}>
      <SnackBar
        text={t("common.copied")}
        isOpened={snackBarOpened}
        onClose={() => {
          setSnackBarOpened(false);
        }}
      />

      {!fbToken && <Alert severity="error">{t("fb.tokenNotFound")}</Alert>}

      {Boolean(fbToken) && (
        <Alert
          severity="success"
          action={
            <IconButton color="success" size="small" onClick={handleClick}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          }
        >
          {fbToken}
        </Alert>
      )}
    </Card>
  );
};

export default FbToken;
