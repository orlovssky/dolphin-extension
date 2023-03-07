import ClearIcon from "@mui/icons-material/Clear";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  useDolphinTokenStore,
  useProfileByToken,
  DOLPHIN_DATA_ERRORS,
} from "entities/dolphinData/publicApi";
import { useSnackBarStore } from "entities/layout/snackBar/publicApi";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card/publicApi";

const DolphinConnectionCard = () => {
  const { t } = useTranslation();
  const dolphinToken = useDolphinTokenStore((state) => state.dolphinToken);
  const openSnackBar = useSnackBarStore((state) => state.openSnackBar);
  const getProfileByToken = useProfileByToken();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    getProfileByToken(token)
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        openSnackBar({
          message: t("dolphin.connectionEstablished"),
          severity: "success",
        });
      })
      .catch((error) => {
        let message = t("common.somethingWentWrong");

        switch (error.message) {
          case DOLPHIN_DATA_ERRORS.INVALID_TOKEN:
            message = t("dolphin.invalidDolphinToken");
            break;
          case DOLPHIN_DATA_ERRORS.PROFILE_RESPONSE_NOT_SUCCESS:
            message = t("dolphin.connectionNotEstablished");
            break;
        }

        openSnackBar({ message, severity: "error" });
      });
  };

  return (
    <Card title={t("dolphin.connection")}>
      <TextField
        value={token}
        label={t("dolphin.token")}
        fullWidth
        size="small"
        disabled={loading}
        InputProps={{
          endAdornment: Boolean(token) && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  setToken("");
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setToken(value);
        }}
      />

      <Box sx={{ textAlign: "center", mt: 1 }}>
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={Boolean(token) && token === dolphinToken}
          onClick={handleClick}
        >
          {t("common.connect")}
        </LoadingButton>
      </Box>
    </Card>
  );
};

export default DolphinConnectionCard;
