import ClearIcon from "@mui/icons-material/Clear";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  useDolphinTokenStore,
  useDolphinProfileStore,
  getProfileByDolphinToken,
  ERRORS,
} from "entities/dolphinData/publicApi";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "shared/ui/card/publicApi";

const DolphinConnectionCard = () => {
  const { t } = useTranslation();
  const setProfile = useDolphinProfileStore((state) => state.setProfile);
  const { dolphinToken, setDolphinToken } = useDolphinTokenStore(
    (state) => state
  );
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleClick = () => {
    setLoading(true);
    setError("");
    getProfileByDolphinToken({ token, setProfile, setDolphinToken })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        switch (error.message) {
          case ERRORS.INVALID_TOKEN:
            setError(t("dolphin.invalidDolphinToken"));
            break;
          case ERRORS.PROFILE_RESPONSE_NOT_SUCCESS:
            setError(t("dolphin.connectionNotEstablished"));
            break;
        }
      });
  };

  useEffect(() => {
    setError("");
  }, [token]);

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

      {Boolean(error) && (
        <Alert sx={{ mt: 1 }} severity="error">
          {error}
        </Alert>
      )}
    </Card>
  );
};

export default DolphinConnectionCard;
