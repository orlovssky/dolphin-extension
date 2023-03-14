import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import {
  getAntyDolphinIntegrationToken,
  useProfile,
} from "entities/antyData/publicApi";
import {
  useProfileByToken,
  useDolphinProfileStore,
} from "entities/dolphinData/publicApi";
import Snackbar, { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { THEME_MODES } from "entities/layout/theme/publicApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddAccountCard from "widgets/addAccountCard/publicApi";
import DolphinConnectionCard from "widgets/dolphinConnectionCard/publicApi";
import FacebookTokenCard from "widgets/facebookTokenCard/publicApi";

const Anty = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { profile } = useDolphinProfileStore((state) => state);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const getProfileByToken = useProfileByToken();
  const getAntyProfile = useProfile();
  const [loading, setLoading] = useState(false);
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    } else if (profile) {
      return (
        <>
          <FacebookTokenCard />
          <AddAccountCard />
        </>
      );
    } else {
      return <DolphinConnectionCard />;
    }
  };
  const handleGetProfileByToken = (token?: string) => {
    getProfileByToken(token)
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        openSnackBar({
          message: t("dolphin.connectionEstablished"),
          severity: "success",
        });
      });
  };

  useEffect(() => {
    setLoading(true);

    getAntyProfile().finally(() => {
      getAntyDolphinIntegrationToken()
        .then((token) => {
          if (token) {
            handleGetProfileByToken(token);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          handleGetProfileByToken();
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
      {renderContent()}
    </Box>
  );
};

export default Anty;
