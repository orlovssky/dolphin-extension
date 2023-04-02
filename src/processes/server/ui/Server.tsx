import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useProfileByToken,
  useDolphinProfileStore,
} from "entities/dolphinData/publicApi";
import { useAccessTokenStore } from "entities/facebookData/publicApi";
import Snackbar, { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { backgroundMixin } from "entities/layout/theme/publicApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddAccountCard from "widgets/addAccountCard/publicApi";
import DolphinConnectionCard from "widgets/dolphinConnectionCard/publicApi";
import FacebookTokenCard from "widgets/facebookTokenCard/publicApi";

const Server = () => {
  const { t } = useTranslation();
  const { profile } = useDolphinProfileStore((state) => state);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const getProfileByToken = useProfileByToken();
  const [loading, setLoading] = useState(false);
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    } else if (profile) {
      return (
        <>
          <FacebookTokenCard />
          {accessToken && <AddAccountCard />}
        </>
      );
    } else {
      return <DolphinConnectionCard />;
    }
  };

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
        ...backgroundMixin(),
        p: 2,
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

export default Server;
