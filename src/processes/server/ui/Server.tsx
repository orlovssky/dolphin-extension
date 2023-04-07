import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useProfileByToken,
  useDolphinProfileStore,
} from "entities/dolphinData";
import { useAccessTokenStore } from "entities/facebookData";
import Snackbar, { useSnackBarStore } from "entities/layout/snackBar";
import { backgroundMixin } from "entities/layout/theme";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddAccountCard from "widgets/addAccountCard";
import DolphinConnectionCard from "widgets/dolphinConnectionCard";
import FacebookTokenCard from "widgets/facebookTokenCard";

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
