import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import {
  useProfileByToken,
  useDolphinProfileStore,
} from "entities/dolphinData/publicApi";
import Snackbar, { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { THEME_MODES } from "entities/layout/theme/publicApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DolphinConnectionCard from "widgets/dolphinConnectionCard/publicApi";
import FacebookTokenCard from "widgets/facebookTokenCard/publicApi";

const Server = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { profile } = useDolphinProfileStore((state) => state);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const getProfileByToken = useProfileByToken();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProfileByToken()
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        openSnackBar({
          message: t("dolphin.connectionEstablished"),
          severity: "success",
        });
      });
  }, []);

  return (
    <Box
      component="main"
      sx={{
        p: 2,
        ...(palette.mode === THEME_MODES.DARK && {
          color: palette.common.white,
          backgroundColor: palette.grey["900"],
        }),
        ...(palette.mode === THEME_MODES.LIGHT && {
          color: palette.common.black,
          backgroundColor: palette.grey["100"],
        }),
        ...(loading && {
          textAlign: "center",
        }),
      }}
    >
      <Snackbar />

      {loading && <CircularProgress />}

      {!loading && (
        <>
          {!profile && <DolphinConnectionCard />}
          {profile && <FacebookTokenCard />}
        </>
      )}
    </Box>
  );
};

export default Server;
