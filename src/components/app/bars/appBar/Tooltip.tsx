import MuiTooltip from "@mui/material/Tooltip";
import MuiTypography from "@mui/material/Typography";
import SnackBar from "components/common/bars/SnackBar";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Tooltip = ({ username }: { username: string }) => {
  const { t } = useTranslation();
  const [snackBarOpened, setSnackBarOpened] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(username).then(() => {
      setSnackBarOpened(true);
    });
  };

  return (
    <>
      <SnackBar
        text={t("common.copied")}
        isOpened={snackBarOpened}
        onClose={() => {
          setSnackBarOpened(false);
        }}
      />

      <MuiTooltip title={username} onClick={handleClick}>
        <MuiTypography
          sx={{ cursor: "pointer" }}
          variant="h6"
          component="h1"
          noWrap
        >
          {`${t("common.user")}: ${username}`}
        </MuiTypography>
      </MuiTooltip>
    </>
  );
};

export default Tooltip;
