import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useDolphinProfileStore } from "entities/dolphinData";
import { useSnackBarStore } from "entities/layout/snackBar";
import { useTranslation } from "react-i18next";

const Title = () => {
  const { t } = useTranslation();
  const profile = useDolphinProfileStore((state) => state.profile);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);

  const handleClick = (name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      openSnackBar({ message: t("common.copied"), severity: "success" });
    });
  };

  if (profile?.id) {
    const name = profile.username;

    return (
      <Tooltip title={name} onClick={() => handleClick(name)}>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h6"
          component="h1"
          noWrap
        >
          {`${t("common.user")}: ${name}`}
        </Typography>
      </Tooltip>
    );
  }

  return (
    <Typography variant="h6" component="h1" noWrap>
      {t("common.authorization")}
    </Typography>
  );
};

export default Title;
